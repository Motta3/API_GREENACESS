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
class Tipo_Servico extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    tipo: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

export default Tipo_Servico;