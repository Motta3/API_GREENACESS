import { Request, Response } from "express";
import CreateUsuarioService from "../services/UsuarioServices/CreateUsuarioService";
import FindUsuarioByIdService from "../services/UsuarioServices/FindUsuarioByIdService";
import UpdateUsuarioService from "../services/UsuarioServices/UpdateUsuarioService";
import FindUsuarioService from "../services/UsuarioServices/FindUsuariosService";
import DeleteUsuarioService from "../services/UsuarioServices/DeleteUsuarioService";

interface UsuarioData {
  login: string,
  nome: string,
  senha: string,
}

interface UsuarioRetorno {
  id?: number,
  limit?: string,
  offset?: string
}

const store = async (req: Request, res: Response): Promise<Response> => {
  let usuarioData: UsuarioData = req.body;

  const { usuario, message, statusCode } = await CreateUsuarioService(usuarioData);

  if (statusCode && message && statusCode !== 200) {
    return res.status(statusCode).json({ message: message })
  } else {
    return res.status(200).json(usuario)
  }

}

const deletar = async (req: Request, res: Response): Promise<Response> => {
  let { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Usuario nao identificado" })
  }

  const usuarioD = await FindUsuarioByIdService(id);

  if (usuarioD.usuario) {
    const { message, statusCode } = await DeleteUsuarioService(id);
    return res.status(statusCode).json({ message })
  }
  return res.status(400).json({ message: "Usuario nao encontrado" });
}

const update = async (req: Request, res: Response): Promise<Response> => {
  let usuarioData: UsuarioData = req.body;

  let { id } = req.body

  if (!id) {
    return res.status(400).json({ message: "Usuario nao identificado" })
  }

  const usuarioU = await FindUsuarioByIdService(id);

  if (usuarioU.usuario) {
    const data_to_update = {
      ...usuarioData,
      id: id,
      usuario: usuarioU.usuario
    };

    const { usuario, message, statusCode } = await UpdateUsuarioService(data_to_update);

    if (statusCode && message && statusCode !== 200) {
      return res.status(statusCode).json({ message: message })
    } else {
      return res.status(200).json(usuario)
    }
  }
  return res.status(400).json({ message: "Usuario nao encontrado" });
}

const searchOne = async (req: Request, res: Response): Promise<Response> => {
  let { id } = req.params

  const usuario = await FindUsuarioByIdService(Number(id));
  if (usuario) {
    return res.status(200);
  } else return res.status(400);
}

const searchAll = async (req: Request, res: Response): Promise<Response> => {
  let usuarioData: UsuarioRetorno = req.query;

  if (!usuarioData.limit)
    usuarioData.limit = "10";

  if (!usuarioData.offset)
    usuarioData.offset = "0";

  const usuario = await FindUsuarioService(usuarioData);
  if (usuario) {
    return res.status(200).json(usuario);
  } else return res.status(400);
}

export { store, update, searchOne, searchAll, deletar };