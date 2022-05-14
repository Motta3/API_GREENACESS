import {
    AllowNull,
    AutoIncrement,
    Column,
    CreatedAt,
    Default,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt,
} from "sequelize-typescript";

@Table
class Usuario extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    nome: string;

    @AllowNull(false)
    @Unique
    @Column
    login: string;

    @AllowNull(false)
    @Column
    senha: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

export default Usuario;
