import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Automovel from "../models/AutomovelModel.js";
import AutomovelFoto from "../models/AutomovelFotoModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadFotos = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            return res.status(400).send({ message: 'Informe o ID do automóvel' });
        }

        const automovel = await Automovel.findOne({ where: { id } });

        if (!automovel) {
            return res.status(404).send({ message: 'Automovel não encontrado' });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).send({ message: 'Envie ao menos uma foto' });
        }

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
const destroyFoto = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
    const fotoId = req.params.fotoId ? req.params.fotoId.toString().replace(/\D/g, '') : null;

    if (!id || !fotoId) {
      return res.status(400).send({ message: 'Informe o ID do automóvel e da foto' });
    }

    const foto = await AutomovelFoto.findOne({
      where: {
        id: Number(fotoId),
        automovelId: Number(id),
      }
    });

    if (!foto) {
      return res.status(404).send({ message: 'Foto não encontrada' });
    }

    // aqui remove o arquivo do disco e depois o registro do banco
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export default {
    uploadFotos,
    destroyFoto,
};