import { Filterable } from "sequelize/types";
import Servico from "../../models/Servico";

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

const FindServicosService = async ({
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
    const servicos = await Servico.findAll({
        where: whereCondition,
        limit: Nlimit,
        offset: Noffset
    });

    const servico = {
        object: "list",
        totalCount: servicos?.length,
        limit: Nlimit,
        offset: Noffset,
        data: servicos
    };

    return servico;
}

export default FindServicosService;