import { Filterable } from "sequelize/types";
import Usuario from "../../models/Usuario";

interface Request {
    id?: number,
    limit?: string,
    offset?: string,
}

interface Response {
    object?: string,
    totalCount?: number,
    limit?: number,
    offset?: number,
    message?: string,
    statusCode?: number
}

const FindUsuariosService = async ({
    id,
    limit,
    offset,
}: Request): Promise<Response> => {
    let Nlimit = Number(limit);
    let Noffset = Number(offset);

    let whereCondition: Filterable["where"];

    //Verificamos qual é a variável que está sendo passada para fazermos o filtro
    if (id) {
        whereCondition = { ...whereCondition, id };
    }

    //Função para mostrarmos todos os clientes achados
    const usuarios = await Usuario.findAll({
        where: whereCondition,
        limit: Nlimit,
        offset: Noffset
    });

    const usuario = {
        object: "list",
        totalCount: usuarios?.length,
        limit: Nlimit,
        offset: Noffset,
        data: usuarios
    };

    return usuario;
}

export default FindUsuariosService;