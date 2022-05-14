import * as yup from "yup";
import sequelize from "../../database";
import Tipo_Servico from "../../models/Tipo_Servico";


interface Request {
    tipo?: string,
    tipo_servico: Tipo_Servico
}

interface Response {
    tipo_servico?: Tipo_Servico;
    message?: string;
    statusCode?: number;
}


const UpdateTipo_ServicoService = async ({
    tipo,
    tipo_servico
}: Request): Promise<Response> => {
    // //Fazer função personalizada para conferir se é string
    let schema = yup.object().shape({
        tipo: yup.string(),
    });


    try {
        //Validando
        await schema.validate({
            tipo,
        });

    } catch (error) {
        return {
            message: "Erro ao atualizar", statusCode: 400
        };
    }

    const transaction = await sequelize.transaction();

    tipo_servico.update({
        tipo,
    });

    await transaction.commit();

    return { tipo_servico };
}

export default UpdateTipo_ServicoService;