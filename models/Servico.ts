import {
    AllowNull,
    AutoIncrement,
    Column,
    CreatedAt,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";

@Table
class Servico extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    titulo_servico: string;

    @AllowNull(false)
    @Column
    descricao: string;

    @AllowNull(false)
    @Column
    data_execucao: Date;

    @AllowNull(false)
    @Column
    id_usuario: number;

    @AllowNull(false)
    @Column
    id_tipo_servico: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

export default Servico;
