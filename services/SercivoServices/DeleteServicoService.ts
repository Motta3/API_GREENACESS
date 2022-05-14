import Servico from "../../models/Servico";

interface Response {
    message: string,
    statusCode: number
};

const DeleteServicoService = async (id: number): Promise<Response> => {
    await Servico.destroy({ where: { id } });
    return {
        message: "Servico excluido com sucesso", statusCode: 204
    };
}

export default DeleteServicoService;
