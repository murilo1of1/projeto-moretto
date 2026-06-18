import Pessoa from "../models/PessoaModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await Pessoa.findAll({
                order: [['id', 'desc']]
            });

            return res.status(200).send({
                message: 'Dados Encontrados',
                data: response
            })
        }

        const response = await Pessoa.findOne({
            where: {
                id: id
            }
        });

        if (!response) {
            return res.status(404).send('Dados não encontrados');
        }

        return res.status(200).send({
            message: 'Dados encontrados',
            data: response
        })

    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const create = async (body) => {
    try {
        const {
            nome,
            email,
            telefone,
            password,
        } = body;

        const passwordHash = await bcrypt.hash(password, 10);

        const response = await Pessoa.create({
            nome,
            email,
            telefone,
            tipoPessoa: 1,
            passwordHash
        });

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (body, id) => {
    try {
        const response = await Pessoa.findOne({
            where: {
                id
            }
        });

        if (!response) {
            throw new Error('Usuário não encontrado');
        }
        if (body.password) {
            delete body.password;
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
                message: 'criado com sucesso!',
                data: response
            });
        }

        const response = await update(req.body, id);
        return res.status(201).send({
            message: 'atualizado com sucesso!',
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
            return res.status(400).send('informa ai paezao')
        }

        const response = await Pessoa.findOne({
            where: {
                id
            }
        });

        if (!response) {
            return res.status(404).send('Usuário não encontrado');
        }

        await response.destroy();

        return res.status(200).send({
            message: 'registro excluido',
            data: response
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const pessoa = await Pessoa.findOne({
            where: {
                email
            }
        });

        if (!pessoa) {
            return res.status(400).send({
                message: "Usuário ou senha incorretos"
            });
        }

        const validaSenha = await bcrypt.compare(password, pessoa.passwordHash);

        if (validaSenha) {
            const token = jwt.sign({
                idPessoa: pessoa.id,
                nome: pessoa.nome,
                email: pessoa.email,
                tipoPessoa: pessoa.tipoPessoa
            }, process.env.TOKEN_KEY, { expiresIn: '8h' });
            return res.status(200).send({
                message: 'Sucesso',
                response: token
            })
        } else {
            return res.status(400).send({
                message: "Usuário ou senha incorretos"
            });
        }

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const createByAdmin = async (req, res) => {
    try {
        const {
            nome,
            email,
            telefone,
            tipoPessoa,
            password,
        } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const response = await Pessoa.create({
            nome,
            email,
            telefone,
            tipoPessoa,
            passwordHash
        });

        return res.status(201).send({
            message: 'Pessoa criada com sucesso!',
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
    destroy,
    login,
    createByAdmin
};
