import sequelize from "../../database";
import Servico from "../../models/Servico";


const SegundaAQuinta = async (data_execucao: Date) => {
    const titulo_servico = "Auxiliar";
    const descricao = "Empacota produtos";
    const id_usuario = 1;
    const id_tipo_servico = 1;
    const transaction = await sequelize.transaction();

    const servico = await Servico.create({
        titulo_servico,
        descricao,
        data_execucao,
        id_usuario,
        id_tipo_servico
    });

    await transaction.commit();

    return servico;
}

export default SegundaAQuinta;