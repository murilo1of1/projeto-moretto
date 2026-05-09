import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Automovel = sequelize.define(
    'Automoveis', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
    }
)