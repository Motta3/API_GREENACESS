import { Request, Response } from "express";
import CreateServicoService from "../services/SercivoServices/CreateServicoService";
import FindServicoByIdService from "../services/SercivoServices/FindServicoByIdService";
import UpdateServicoService from "../services/SercivoServices/UpdateServicoService";
import FindServicoService from "../services/SercivoServices/FindServicoService";
import DeleteServicoService from "../services/SercivoServices/DeleteServicoService";
import SegundaAQuinta from "../services/SercivoServices/SegundaAQuinta";

interface ServicoData {
  titulo_servico: string,
  descricao: string,
  data_execucao: Date,
  id_usuario: number,
  id_tipo_servico: number
}

interface ServicoRetorno {
  id?: number,
  limit?: string,
  offset?: string
}

const automatico = async (req: Request, res: Response): Promise<Response> => {
  //const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const d = new Date();
  //let day = days[d.getDay()];

  // if (day !== "Sunday" && day !== "Friday" && day !== "Saturday") {
  //   SegundaAQuinta(d);
  // }
  const servico = await SegundaAQuinta(d);

  return res.status(200).json(servico);
}

const store = async (req: Request, res: Response): Promise<Response> => {
  let servicoData: ServicoData = req.body;

  const { servico, message, statusCode } = await CreateServicoService(servicoData);

  if (statusCode && message && statusCode !== 200) {
    return res.status(statusCode).json({ message: message })
  } else {
    return res.status(200).json(servico)
  }

}

const deletar = async (req: Request, res: Response): Promise<Response> => {
  let { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Servico nao identificado" })
  }

  const servicoD = await FindServicoByIdService(id);

  if (servicoD.servico) {
    const { message, statusCode } = await DeleteServicoService(id);
    return res.status(statusCode).json({ message })
  }
  return res.status(400).json({ message: "Servico nao encontrado" });
}

const update = async (req: Request, res: Response): Promise<Response> => {
  let servicoData: ServicoData = req.body;

  let { id } = req.body

  if (!id) {
    return res.status(400).json({ message: "Servico nao identificado" })
  }

  const servicoU = await FindServicoByIdService(id);

  if (servicoU.servico) {
    const data_to_update = {
      ...servicoData,
      id: id,
      servico: servicoU.servico
    };

    const { servico, message, statusCode } = await UpdateServicoService(data_to_update);

    if (statusCode && message && statusCode !== 200) {
      return res.status(statusCode).json({ message: message })
    } else {
      return res.status(200).json(servico)
    }
  }
  return res.status(400).json({ message: "Servico nao encontrado" });
}

const searchOne = async (req: Request, res: Response): Promise<Response> => {
  let { id } = req.params

  const servico = await FindServicoByIdService(Number(id));
  if (servico) {
    return res.status(200);
  } else return res.status(400);
}

const searchAll = async (req: Request, res: Response): Promise<Response> => {
  let servicoData: ServicoRetorno = req.query;

  if (!servicoData.limit)
    servicoData.limit = "10";

  if (!servicoData.offset)
    servicoData.offset = "0";

  const servico = await FindServicoService(servicoData);
  if (servico) {
    return res.status(200).json(servico);
  } else return res.status(400);
}

export { store, update, searchOne, searchAll, deletar, automatico };