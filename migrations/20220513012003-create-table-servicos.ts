import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable("Tipo_Servicos", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            titulo_servico: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            data_execucao: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            id_tipo_servico: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        });
    },


    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable("tipo_servicos");
    },
};
