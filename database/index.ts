import { Sequelize } from "sequelize-typescript";
import Usuario from "../models/Usuario";
import Tipo_Servico from "../models/Tipo_Servico";
import Servico from "../models/Servico";


//Requerendo as configurações do banco de dados
const dbConfig = require("../config/database");

//Atribuindo ao sequelize o banco de dados
const sequelize = new Sequelize(dbConfig);

//Atribuindo ao sequelize as configurações modelos
const models = [Usuario, Tipo_Servico, Servico];

sequelize.addModels(models);

//Exportando o sequelize para usarmos ele posteriormente
export default sequelize;
