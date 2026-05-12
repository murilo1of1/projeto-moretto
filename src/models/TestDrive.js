import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Pessoa from "./Pessoa.js"; 
import Automovel from "./Automevel.js";

const TestDrive = sequelize.define(
    'TestDrives', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dataAgendamento: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'data_agendamento'
        },
        status: {
            type: DataTypes.ENUM('agendado', 'concluido', 'cancelado'),
            defaultValue: 'agendado',
        },
        pessoaId: {
            type: DataTypes.INTEGER,
            references: { model: 'Pessoas', key: 'id' },
            field: 'pessoa_id'
        },
        automovelId: {
            type: DataTypes.INTEGER,
            references: { model: 'Automoveis', key: 'id' },
            field: 'automovel_id',
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

//Aqui mostra que Test Drive peartence a uma Pessoa e a um Automóvel

TesteDrive.belongsTo(Pessoa, { foreignKey: 'pessoa_id' });
TesteDrive.belongsTo(Automovel, { foreignKey: 'automovel_id' });

//Aqui quer dizer que uma pessoa pode ter vários test drives

Pessoa.hasMany(TestDrive, { foreignKey: 'pessoa_id' });
Automovel.hasMany(TestDrive, { foreignKey: 'automovel_id' });



export default TestDrive;
