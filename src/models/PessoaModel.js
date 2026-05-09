import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Pessoa = sequelize.define(
    'Pessoas', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpfCnpj: {
            type: DataTypes.STRING(14),
            allowNull: false,
            unique: true,
            field: 'cpf_cnpj',
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tipoPessoa: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            field: 'tipo_pessoa',
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Pessoa;


