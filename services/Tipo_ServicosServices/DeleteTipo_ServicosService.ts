import Tipo_Servico from "../../models/Tipo_Servico";

interface Response {
    message: string,
    statusCode: number
};

const DeleteTipo_ServicoService = async (id: number): Promise<Response> => {
    await Tipo_Servico.destroy({ where: { id } });
    return {
        message: "Tipo de servicos excluido com sucesso", statusCode: 204
    };
}

export default DeleteTipo_ServicoService;
