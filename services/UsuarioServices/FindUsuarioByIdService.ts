import { Filterable } from "sequelize/types";
import Usuario from "../../models/Usuario";

interface Response {
    usuario?: Usuario
    message?: string;
    statusCode?: number;
}

const FindUsuarioyIdService = async (id: number): Promise<Response> => {
    let whereCondition: Filterable["where"];
    whereCondition = { ...whereCondition, id };

    //Função para mostrarmos todos os Usuarios achados
    const usuario = await Usuario.findOne({ where: whereCondition });

    if (!usuario) {
        return {
            message: "Usuario Não Existe", statusCode: 400
        };
    }

    return { usuario };
}

export default FindUsuarioyIdService;