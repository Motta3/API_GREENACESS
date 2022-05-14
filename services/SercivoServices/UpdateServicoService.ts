import { Filterable } from "sequelize/types";
import * as yup from "yup";
import sequelize from "../../database";
import Servico from "../../models/Servico";
import Tipo_Servico from "../../models/Tipo_Servico";
import Usuario from "../../models/Usuario";


interface Request {
    titulo_servico?: string,
    descricao?: string,
    data_execucao?: Date,
    id_usuario?: number,
    id_tipo_servico?: number
    servico: Servico
}

interface Response {
    servico?: Servico,
    message?: string,
    statusCode?: number
}


const UpdateServicoService = async ({
    titulo_servico,
    descricao,
    data_execucao,
    id_usuario,
    id_tipo_servico,
    servico
}: Request): Promise<Response> => {
    let whereCondition: Filterable["where"];

    whereCondition = { ...whereCondition, id: id_usuario };
    //Buscando no banco para vermos se o Usuario já não existe, caso existir interopermos o procedimento
    const buscaUsuario = await Usuario.findAll({
        where: whereCondition
    });

    if (buscaUsuario.length === 0) {
        return {
            message: "Usuario nao cadastrado", statusCode: 400
        };
    }

    whereCondition = [];

    whereCondition = { ...whereCondition, id: id_tipo_servico };
    //Buscando no banco para vermos se o Usuario já não existe, caso existir interopermos o procedimento
    const buscaTipo_Servico = await Tipo_Servico.findAll({
        where: whereCondition
    });

    if (buscaTipo_Servico.length === 0) {
        return {
            message: "Tipo servico nao cadastrado", statusCode: 400
        };
    }

    //Usando o yup iremos fazer a validação da maioria dos parametros, só não algum que tiver alguma verificação especial
    let schema = yup.object().shape({
        titulo_servico: yup.string().required(),
        nodescricaome: yup.string().required(),
        data_execucao: yup.date().required(),
        id_usuario: yup.number().required(),
        id_tipo_servico: yup.number().required()
    });

    try {
        //Validando
        await schema.validate({
            titulo_servico,
            descricao,
            data_execucao,
            id_usuario,
            id_tipo_servico
        });
    } catch (error) {
        return {
            message: "Erro ao atualizar Servico, crendencial invalida", statusCode: 400
        };
    }

    const transaction = await sequelize.transaction();

    servico.update({
        titulo_servico,
        descricao,
        data_execucao,
        id_usuario,
        id_tipo_servico,
    });

    await transaction.commit();

    return { servico };
}

export default UpdateServicoService;