import express from "express";
import * as UsuariosControllers from "../controllers/UsuariosControllers";
import * as Tipo_ServicosControllers from "../controllers/Tipo_ServicosControllers";
import * as ServicosControllers from "../controllers/ServicosControllers";

//Aqui fazemos as rotas para nosso uso
const router = express.Router();

//usuarios
router.get("/usuarios", UsuariosControllers.searchAll);
router.put("/usuarios", UsuariosControllers.update);
router.post("/usuarios", UsuariosControllers.store);
router.get("/usuarios/:id", UsuariosControllers.searchOne);
router.delete("/usuarios", UsuariosControllers.deletar);

//tipo servico
router.post("/tipo_servico", Tipo_ServicosControllers.store);
router.get("/tipo_servico", Tipo_ServicosControllers.searchAll);
router.get("/tipo_servico/:id", Tipo_ServicosControllers.searchOne);
router.delete("/tipo_servico", Tipo_ServicosControllers.deletar);
router.put("/tipo_servico", Tipo_ServicosControllers.update);

//servico
router.post("/servico", ServicosControllers.store);
router.get("/servico", ServicosControllers.searchAll);
router.get("/servico/:id", ServicosControllers.searchOne);
router.delete("/servico", ServicosControllers.deletar);
router.put("/servico", ServicosControllers.update);
router.post("/servicoAt", ServicosControllers.automatico);


export { router };
