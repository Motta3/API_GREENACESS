import Usuario from "../../models/Usuario";

interface Response {
    message: string,
    statusCode: number
};

const DeleteUsuarioService = async (id: number): Promise<Response> => {
    await Usuario.destroy({ where: { id } });
    return {
        message: "Usuario excluido com sucesso", statusCode: 204
    };
}

export default DeleteUsuarioService;
