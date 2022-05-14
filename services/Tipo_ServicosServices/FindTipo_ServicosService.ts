import { Filterable } from "sequelize/types";
import Tipo_Servico from "../../models/Tipo_Servico";

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

const FindTipo_ServicoService = async ({
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
    const tipo_servicos = await Tipo_Servico.findAll({
        where: whereCondition,
        limit: Nlimit,
        offset: Noffset
    });

    const tipo_servico = {
        object: "list",
        totalCount: tipo_servicos?.length,
        limit: Nlimit,
        offset: Noffset,
        data: tipo_servicos
    };

    return tipo_servico;
}

export default FindTipo_ServicoService;