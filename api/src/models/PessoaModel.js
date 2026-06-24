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
            allowNull: true,
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
        },
        passwordHash: {
            type: DataTypes.STRING,
            field: 'password_hash',
            allowNull: false,   
        },
        resetPasswordToken: {
            type: DataTypes.STRING(255),
            field: 'reset_password_token',
            allowNull: true,
        },
        resetPasswordExpires: {
            type: DataTypes.DATE,
            field: 'reset_password_expires',
            allowNull: true,
        },
        token: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

// Nunca expõe campos sensíveis nas respostas da API.
Pessoa.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.passwordHash;
    delete values.resetPasswordToken;
    delete values.resetPasswordExpires;
    delete values.token;
    return values;
};

export default Pessoa;