import express, { urlencoded, json } from "express";
import helmet from "helmet";
import cors from "cors";
import CookieParser from "cookie-parser";
import { router } from "./routes/ApiGreenAcessoRoutes";
import job from "./cron/SendServiceCron";

require("./database/index");
//Aqui fazemos o servidor

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: "*"
  })
);
app.use(CookieParser());

//Máxima quantidade de espaço que o json pode ter
app.use(json({ limit: "2mb" }));
app.use(urlencoded({ extended: true }));

//Usando as Rotas
app.use(router);

//Iniciando o servidor
app.listen(3000, async () => {
  console.log("Rodando na porta 3000");
  job.start();
});
