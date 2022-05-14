import { Filterable } from "sequelize/types";
import * as yup from "yup";
import sequelize from "../../database";
import Tipo_Servico from "../../models/Tipo_Servico";

interface Request {
    tipo: string,
}

interface Response {
    tipo_servico?: Tipo_Servico,
    message?: string,
    statusCode?: number,
}

const CreateUsuarioService = async ({
    tipo
}: Request): Promise<Response> => {
    //Usando o yup iremos fazer a validação da maioria dos parametros, só não algum que tiver alguma verificação especial
    let schema = yup.object().shape({
        tipo: yup.string().required(),
    });

    let whereCondition: Filterable["where"];

    try {
        //Validando
        await schema.validate({
            tipo
        });
    } catch (error) {
        return {
            message: "Erro ao criar tipo servico, crendencial invalida", statusCode: 400
        };
    }


    whereCondition = { ...whereCondition, tipo };
    //Buscando no banco para vermos se o Usuario já não existe, caso existir interopermos o procedimento
    const buscaLogin = await Tipo_Servico.findAll({
        where: whereCondition
    });

    if (buscaLogin.length > 0) {
        return {
            message: "Tipo já cadastrado", statusCode: 400
        };
    }

    const transaction = await sequelize.transaction();

    const tipo_servico = await Tipo_Servico.create({
        tipo
    });
    await transaction.commit();

    return { tipo_servico };
}

export default CreateUsuarioService;
