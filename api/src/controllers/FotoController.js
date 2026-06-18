import fs from "fs";
import path from "path";

import Automovel from "../models/AutomovelModel.js";
import AutomovelFoto from "../models/AutomovelFotoModel.js";

const resolveUploadPath = (relativeUrl) =>
  path.join(process.cwd(), relativeUrl.replace(/^\//, ""));

const uploadFotos = async (req, res) => {
  try {
    const id = req.params.id
      ? req.params.id.toString().replace(/\D/g, "")
      : null;

    if (!id) {
      return res.status(400).send({ message: "Informe o ID do automóvel" });
    }

    const automovel = await Automovel.findOne({ where: { id } });

    if (!automovel) {
      return res.status(404).send({ message: "Automovel não encontrado" });
    }

    const files = Array.isArray(req.files) ? req.files : [];

    if (!files.length) {
      return res.status(400).send({ message: "Envie ao menos uma foto" });
    }

    const destaqueInicial =
      req.body.destaque !== undefined ? Number(req.body.destaque) : 1;
    const totalAtual = await AutomovelFoto.count({
      where: { automovelid: Number(id) },
    });

    const fotosCriadas = [];

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      const foto = await AutomovelFoto.create({
        automovelid: Number(id),
        url: `/uploads/automoveis/${file.filename}`,
        ordem: totalAtual + index + 1,
        destaque: index === 0 ? destaqueInicial : 0,
      });

      fotosCriadas.push(foto);
    }

    return res.status(201).send({
      message: "Fotos enviadas com sucesso",
      data: fotosCriadas,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const destroyFoto = async (req, res) => {
  try {
    const id = req.params.id
      ? req.params.id.toString().replace(/\D/g, "")
      : null;
    const fotoId = req.params.fotoId
      ? req.params.fotoId.toString().replace(/\D/g, "")
      : null;

    if (!id || !fotoId) {
      return res
        .status(400)
        .send({ message: "Informe o ID do automóvel e da foto" });
    }

    const foto = await AutomovelFoto.findOne({
      where: {
        id: Number(fotoId),
        automovelid: Number(id),
      },
    });

    if (!foto) {
      return res.status(404).send({ message: "Foto não encontrada" });
    }

    const filePath = resolveUploadPath(foto.url);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await foto.destroy();

    return res.status(200).send({
      message: "Foto removida com sucesso",
      data: foto,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export default {
  uploadFotos,
  destroyFoto,
};
