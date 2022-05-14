import { Request, Response } from "express";
import CreateTipo_ServicosService from "../services/Tipo_ServicosServices/CreateTipo_ServicosService";
import FindTipo_ServicosByIdService from "../services/Tipo_ServicosServices/FindTipo_ServicosByIdService";
import UpdateTipo_ServicosService from "../services/Tipo_ServicosServices/UpdateTipo_ServicosService";
import FindTipo_ServicosService from "../services/Tipo_ServicosServices/FindTipo_ServicosService";
import DeleteTipo_ServicosService from "../services/Tipo_ServicosServices/DeleteTipo_ServicosService";

interface Tipo_ServicosData {
    tipo: string
}

interface Tipo_ServicosRetorno {
    id?: number,
    limit?: string,
    offset?: string
}

const store = async (req: Request, res: Response): Promise<Response> => {
    let tipo_servicosData: Tipo_ServicosData = req.body;

    const { tipo_servico, message, statusCode } = await CreateTipo_ServicosService(tipo_servicosData);

    if (statusCode && message && statusCode !== 200) {
        return res.status(statusCode).json({ message: message })
    } else {
        return res.status(200).json(tipo_servico)
    }

}

const deletar = async (req: Request, res: Response): Promise<Response> => {
    let { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Tipo de servicos nao identificado" })
    }

    const tipo_servicosD = await FindTipo_ServicosByIdService(id);

    if (tipo_servicosD.tipo_servico) {
        const { message, statusCode } = await DeleteTipo_ServicosService(id);
        return res.status(statusCode).json({ message })
    }
    return res.status(400).json({ message: "Tipo de servicos nao encontrado" });
}

const update = async (req: Request, res: Response): Promise<Response> => {
    let tipo_servicosData: Tipo_ServicosData = req.body;

    let { id } = req.body

    if (!id) {
        return res.status(400).json({ message: "Tipo de servicos nao identificado" })
    }

    const tipo_servicosU = await FindTipo_ServicosByIdService(id);

    if (tipo_servicosU.tipo_servico) {
        const data_to_update = {
            ...tipo_servicosData,
            id: id,
            tipo_servico: tipo_servicosU.tipo_servico
        };

        const { tipo_servico, message, statusCode } = await UpdateTipo_ServicosService(data_to_update);

        if (statusCode && message && statusCode !== 200) {
            return res.status(statusCode).json({ message: message })
        } else {
            return res.status(200).json(tipo_servico)
        }
    }
    return res.status(400).json({ message: "Tipo de servicos nao encontrado" });
}

const searchOne = async (req: Request, res: Response): Promise<Response> => {
    let { id } = req.params

    const tipo_servicos = await FindTipo_ServicosByIdService(Number(id));
    if (tipo_servicos) {
        return res.status(200);
    } else return res.status(400);
}

const searchAll = async (req: Request, res: Response): Promise<Response> => {
    let tipo_servicosData: Tipo_ServicosRetorno = req.query;

    if (!tipo_servicosData.limit)
        tipo_servicosData.limit = "10";

    if (!tipo_servicosData.offset)
        tipo_servicosData.offset = "0";

    const tipo_servicos = await FindTipo_ServicosService(tipo_servicosData);
    if (tipo_servicos) {
        return res.status(200).json(tipo_servicos);
    } else return res.status(400);
}

export { store, update, searchOne, searchAll, deletar };