import { Filterable } from "sequelize/types";
import * as yup from "yup";
import sequelize from "../../database";
import Usuario from "../../models/Usuario";
import crypt from "../Criptografia/Crypt";

interface Request {
    login: string,
    nome: string,
    senha: string,
}

interface Response {
    usuario?: Usuario,
    message?: string,
    statusCode?: number,
}

const CreateUsuarioService = async ({
    login,
    nome,
    senha,
}: Request): Promise<Response> => {
    //Usando o yup iremos fazer a validação da maioria dos parametros, só não algum que tiver alguma verificação especial
    let schema = yup.object().shape({
        login: yup.string().required(),
        nome: yup.string().required(),
        senha: yup.string().required().min(8).max(20),
    });

    let whereCondition: Filterable["where"];

    try {
        //Validando
        await schema.validate({
            nome,
            login,
            senha
        });
    } catch (error) {
        return {
            message: "Erro ao criar Usuario, crendencial invalida", statusCode: 400
        };
    }

    senha = crypt(senha);

    whereCondition = { ...whereCondition, login };
    //Buscando no banco para vermos se o Usuario já não existe, caso existir interopermos o procedimento
    const buscaLogin = await Usuario.findAll({
        where: whereCondition
    });

    if (buscaLogin.length > 0) {
        return {
            message: "Login já cadastrado", statusCode: 400
        };
    }

    const transaction = await sequelize.transaction();

    const usuario = await Usuario.create({
        nome,
        login,
        senha
    });
    await transaction.commit();

    return { usuario };
}

export default CreateUsuarioService;
