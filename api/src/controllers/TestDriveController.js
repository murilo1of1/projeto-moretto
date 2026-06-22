import TestDrive from "../models/TestDriveModel.js";
import Pessoa from "../models/PessoaModel.js";
import Automovel from "../models/AutomovelModel.js";

const get = async (req, res) => {
  try {
    const id = req.params.id
      ? req.params.id.toString().replace(/\D/g, "")
      : null;

    if (!id) {
      const response = await TestDrive.findAll({
        include: [
          { model: Pessoa, attributes: ["id", "nome", "email", "telefone"] },
          {
            model: Automovel,
            attributes: ["id", "marca", "modelo", "ano", "placa"],
          },
        ],
        order: [["id", "desc"]],
      });

      return res.status(200).send({
        message: "Dados Encontrados",
        data: response,
      });
    }

    const response = await TestDrive.findOne({
      where: { id },
      include: [
        { model: Pessoa, attributes: ["id", "nome", "email", "telefone"] },
        {
          model: Automovel,
          attributes: ["id", "marca", "modelo", "ano", "placa"],
        },
      ],
    });

    if (!response) {
      return res.status(404).send("Test Drive não encontrado");
    }

    return res.status(200).send({
      message: "Dados encontrados",
      data: response,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const create = async (body) => {
  try {
    const { dataAgendamento, status, pessoaId, automovelId } = body;

    const response = await TestDrive.create({
      dataAgendamento,
      status: status || "agendado",
      pessoaId,
      automovelId,
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async (body, id) => {
  try {
    const response = await TestDrive.findOne({
      where: { id },
    });

    if (!response) {
      throw new Error("Test Drive não encontrado");
    }

    Object.keys(body).forEach((item) => (response[item] = body[item]));
    await response.save();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const persist = async (req, res) => {
  try {
    const id = req.params.id
      ? req.params.id.toString().replace(/\D/g, "")
      : null;

    if (!id) {
      const response = await create(req.body);
      return res.status(201).send({
        message: "Test Drive agendado com sucesso!",
        data: response,
      });
    }

    const response = await update(req.body, id);
    return res.status(201).send({
      message: "Test Drive atualizado com sucesso!",
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id
      ? req.params.id.toString().replace(/\D/g, "")
      : null;
    if (!id) {
      return res.status(400).send("Informe o ID do Test Drive");
    }

    const response = await TestDrive.findOne({
      where: { id },
    });

    if (!response) {
      return res.status(404).send("Test Drive não encontrado");
    }

    await response.destroy();

    return res.status(200).send({
      message: "Test Drive cancelado com sucesso!",
      data: response,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default {
  get,
  persist,
  destroy,
};
