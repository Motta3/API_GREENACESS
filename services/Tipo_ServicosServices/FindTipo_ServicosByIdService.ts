import { Filterable } from "sequelize/types";
import Tipo_Servico from "../../models/Tipo_Servico";

interface Response {
    tipo_servico?: Tipo_Servico
    message?: string;
    statusCode?: number;
}

const FindTipo_ServicoyIdService = async (id: number): Promise<Response> => {
    let whereCondition: Filterable["where"];
    whereCondition = { ...whereCondition, id };

    //Função para mostrarmos todos os Tipo_Servicos achados
    const tipo_servico = await Tipo_Servico.findOne({ where: whereCondition });

    if (!tipo_servico) {
        return {
            message: "Tipo de servicos Não Existe", statusCode: 400
        };
    }

    return { tipo_servico };
}

export default FindTipo_ServicoyIdService;