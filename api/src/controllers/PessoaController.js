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
            });
        }

        if (req.user.tipoPessoa !== 2 && Number(req.user.idPessoa) !== Number(id)) {
            return res.status(403).send({ message: 'Acesso negado' });
        }

        const response = await Pessoa.findOne({ where: { id } });

        if (!response) {
            return res.status(404).send('Dados não encontrados');
        }

        return res.status(200).send({
            message: 'Dados encontrados',
            data: response
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const create = async (body) => {
    const {
        nome,
        email,
        telefone,
        password,
    } = body;

    if (!nome || !email || !password) {
        throw new Error('Nome, email e senha são obrigatórios.');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return Pessoa.create({
        nome,
        email,
        telefone,
        tipoPessoa: 1,
        passwordHash
    });
};

const update = async (body, id, requester) => {
    const pessoa = await Pessoa.findOne({ where: { id } });

    if (!pessoa) {
        throw new Error('Usuário não encontrado');
    }

    const camposPermitidos = ['nome', 'email', 'telefone'];
    if (requester?.tipoPessoa === 2) {
        camposPermitidos.push('tipoPessoa');
    }

    camposPermitidos.forEach((campo) => {
        if (body[campo] !== undefined) {
            pessoa[campo] = body[campo];
        }
    });

    if (body.password) {
        pessoa.passwordHash = await bcrypt.hash(body.password, 10);
    }

    await pessoa.save();
    return pessoa;
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

        if (req.user.tipoPessoa !== 2 && Number(req.user.idPessoa) !== Number(id)) {
            return res.status(403).send({ message: 'Acesso negado' });
        }

        const response = await update(req.body, id, req.user);
        return res.status(200).send({
            message: 'atualizado com sucesso!',
            data: response
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).send({
                message: 'Email já cadastrado.'
            });
        }

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).send({
                message: error.errors.map((err) => err.message).join(', ')
            });
        }

        return res.status(500).send({
            message: error.message
        });
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
        if (!id) {
            return res.status(400).send({ message: 'Informe o ID da pessoa' });
        }

        if (req.user.tipoPessoa !== 2 && Number(req.user.idPessoa) !== Number(id)) {
            return res.status(403).send({ message: 'Acesso negado' });
        }

        const response = await Pessoa.findOne({ where: { id } });

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

        if (!validaSenha) {
            return res.status(400).send({ message: "Usuário ou senha incorretos" });
        }

        const token = jwt.sign({
            idPessoa: pessoa.id,
            nome: pessoa.nome,
            email: pessoa.email,
            tipoPessoa: pessoa.tipoPessoa
        }, process.env.TOKEN_KEY, { expiresIn: '8h' });

        return res.status(200).send({ message: 'Sucesso', response: token });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const createByAdmin = async (req, res) => {
    try {
        const { nome, email, telefone, tipoPessoa, password } = req.body;

        if (!nome || !email || !password) {
            return res.status(400).send({ message: 'Nome, email e senha são obrigatórios.' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const response = await Pessoa.create({
            nome,
            email,
            telefone,
            tipoPessoa: tipoPessoa ?? 1,
            passwordHash
        });

        return res.status(201).send({
            message: 'Pessoa criada com sucesso!',
            data: response
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).send({
                message: 'Email já cadastrado.'
            });
        }

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).send({
                message: error.errors.map((err) => err.message).join(', ')
            });
        }

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
