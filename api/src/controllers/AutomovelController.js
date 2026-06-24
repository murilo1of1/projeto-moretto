import Automovel from "../models/AutomovelModel.js";
import AutomovelFoto from "../models/AutomovelFotoModel.js";

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await Automovel.findAll({
                include: [{ model: AutomovelFoto, as: 'fotos' }],
                order: [['id', 'desc']]
            });

            return res.status(200).send({
                message: 'Dados Encontrados',
                data: response
            });
        }

        const response = await Automovel.findOne({
            where: { id },
            include: [{ model: AutomovelFoto, as: 'fotos' }]
        });

        if (!response) {
            return res.status(404).send('Automovel não encontrado');
        }

        return res.status(200).send({
            message: 'Dados encontrados',
            data: response
        });

    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const create = async (body) => {
    try {
        const {
            placa,
            marca,
            modelo,
            ano,
            cor
        } = body;

        const response = await Automovel.create({
            placa,
            marca,
            modelo,
            ano,
            cor
        });

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (body, id) => {
    try {
        const response = await Automovel.findOne({
            where: { id }
        });

        if (!response) {
            throw new Error('Automovel não encontrado');
        }

        Object.keys(body).forEach((item) => response[item] = body[item]);
        await response.save();
        return response;

    } catch (error) {
        throw new Error(error.message);
    }
};

const persist = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await create(req.body);
            return res.status(201).send({
                message: 'Automóvel criado com sucesso!',
                data: response
            });
        }

        const response = await update(req.body, id);
        return res.status(201).send({
            message: 'Automóvel atualizado com sucesso!',
            data: response
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
        if (!id) {
            return res.status(400).send('Informe o ID do automóvel');
        }

        const response = await Automovel.findOne({
            where: { id }
        });

        if (!response) {
            return res.status(404).send('Automóvel não encontrado');
        }

        await response.destroy();

        return res.status(200).send({
            message: 'Registro excluído',
            data: response
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};

export default {
    get,
    persist,
    destroy
};