import { Filterable } from "sequelize/types";
import Servico from "../../models/Servico";

interface Response {
    servico?: Servico
    message?: string;
    statusCode?: number;
}

const FindServicoByIdService = async (id: number): Promise<Response> => {
    let whereCondition: Filterable["where"];
    whereCondition = { ...whereCondition, id };

    //Função para mostrarmos todos os Servicos achados
    const servico = await Servico.findOne({ where: whereCondition });

    if (!servico) {
        return {
            message: "Servico Não Existe", statusCode: 400
        };
    }

    return { servico };
}

export default FindServicoByIdService;