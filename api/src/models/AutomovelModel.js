import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Automovel = sequelize.define(
    'Automoveis', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        placa: {
            type: DataTypes.STRING(7),
            allowNull: false,
            unique: true,
        },
        marca: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        modelo: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        ano: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cor: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Automovel;