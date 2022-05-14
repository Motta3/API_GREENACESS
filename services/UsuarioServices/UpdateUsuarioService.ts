import * as yup from "yup";
import sequelize from "../../database";
import Usuario from "../../models/Usuario";


interface Request {
    nome?: string,
    login?: string,
    senha?: string
    usuario: Usuario
}

interface Response {
    usuario?: Usuario;
    message?: string;
    statusCode?: number;
}


const UpdateClientService = async ({
    nome,
    login,
    senha,
    usuario
}: Request): Promise<Response> => {
    // //Fazer função personalizada para conferir se é string
    let schema = yup.object().shape({
        nome: yup.string(),
        login: yup.string(),
        senha: yup.string().min(8).max(20),
    });


    try {
        //Validando
        await schema.validate({
            nome,
            login,
            senha
        });

    } catch (error) {
        return {
            message: "Erro ao atualizar", statusCode: 400
        };
    }

    const transaction = await sequelize.transaction();

    usuario.update({
        nome,
        login,
        senha
    });

    await transaction.commit();

    return { usuario };
}

export default UpdateClientService;