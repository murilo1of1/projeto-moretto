import TestDrive from "../models/TestDriveModel.js";
import Pessoa from "../models/PessoaModel.js";
import Automovel from "../models/AutomovelModel.js";

const includes = [
  { model: Pessoa, as: "pessoa", attributes: ["id", "nome", "email", "telefone"] },
  { model: Automovel, as: "automovel", attributes: ["id", "marca", "modelo", "ano", "placa"] },
];

const get = async (req, res) => {
  try {
    const id = req.params.id
      ? req.params.id.toString().replace(/\D/g, "")
      : null;
    const isAdmin = req.user.tipoPessoa === 2;

    if (!id) {
      const where = isAdmin ? {} : { pessoaId: req.user.idPessoa };

      const response = await TestDrive.findAll({
        where,
        include: includes,
        order: [["id", "desc"]],
      });

      return res.status(200).send({
        message: "Dados Encontrados",
        data: response,
      });
    }

    const response = await TestDrive.findOne({
      where: { id },
      include: includes,
    });

    if (!response) {
      return res.status(404).send({ message: "Test Drive não encontrado" });
    }

    if (!isAdmin && Number(response.pessoaId) !== Number(req.user.idPessoa)) {
      return res.status(403).send({ message: "Acesso negado" });
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
  const { dataAgendamento, status, pessoaId, automovelId } = body;

  if (!dataAgendamento || !automovelId) {
    throw new Error("Informe a data e o automóvel para o test drive.");
  }

  return TestDrive.create({
    dataAgendamento,
    status: status || "agendado",
    pessoaId,
    automovelId,
  });
};

const update = async (body, id) => {
  const response = await TestDrive.findOne({ where: { id } });

  if (!response) {
    throw new Error("Test Drive não encontrado");
  }

  const camposPermitidos = ["dataAgendamento", "status", "automovelId"];
  camposPermitidos.forEach((campo) => {
    if (body[campo] !== undefined) {
      response[campo] = body[campo];
    }
  });

  await response.save();
  return response;
};

const persist = async (req, res) => {
  try {
    const id = req.params.id
      ? req.params.id.toString().replace(/\D/g, "")
      : null;

    if (!id) {
      const response = await create({
        ...req.body,
        pessoaId: req.user.idPessoa,
      });

      return res.status(201).send({
        message: "Test Drive agendado com sucesso!",
        data: response,
      });
    }

    const response = await update(req.body, id);
    return res.status(200).send({
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
