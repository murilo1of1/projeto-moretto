import { DataTypes } from 'sequelize';
import { sequelize } from "../config/database.js";
import Automovel from './AutomovelModel.js';

const AutomovelFoto = sequelize.define(
    'AutomovelFotos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        automovelid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'automovel_id',
        },
        url: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        ordem: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        destaque: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

Automovel.hasMany(AutomovelFoto, { foreignKey: 'automovelid', as: 'fotos', onDelete: 'CASCADE' });
AutomovelFoto.belongsTo(Automovel, { foreignKey: 'automovelid', as: 'automovel' });

export default AutomovelFoto;
