import sequelize from "../database";
import Servico from "../models/Servico";

const CronJob = require('cron').CronJob;

const job = new CronJob('0 0 8 * MON,WED,FRI *',
    async function () {
        const titulo_servico = "Auxiliar";
        const descricao = "Empacota produtos";
        const data_execucao = new Date();
        const id_usuario = 1;
        const id_tipo_servico = 1;

        if (Number(data_execucao.getFullYear()) < 2023) {
            return;
        }

        const transaction = await sequelize.transaction();

        await Servico.create({
            titulo_servico,
            descricao,
            data_execucao,
            id_usuario,
            id_tipo_servico
        });

        await transaction.commit();
    }, null, true
)

export default job;
