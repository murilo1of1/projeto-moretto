import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Pessoa from "./PessoaModel.js";
import Automovel from "./AutomovelModel.js";

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

// Aqui mostra que Test Drive pertence a uma Pessoa e a um Automóvel.
// Aliases explícitos evitam depender da pluralização automática do Sequelize
// (o model 'Automoveis' era singularizado para a chave 'Automovei').
TestDrive.belongsTo(Pessoa, { foreignKey: 'pessoaId', as: 'pessoa' });
TestDrive.belongsTo(Automovel, { foreignKey: 'automovelId', as: 'automovel' });

// Aqui quer dizer que uma pessoa pode ter vários test drives.
Pessoa.hasMany(TestDrive, { foreignKey: 'pessoaId' });
Automovel.hasMany(TestDrive, { foreignKey: 'automovelId' });



export default TestDrive;
