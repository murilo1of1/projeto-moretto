import "dotenv/config";
import express from "express";
import fs from "fs";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "node:path";
import "./models/index.js";

import Routes from "./routes/index.js";
import { sequelize } from "./config/database.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

if (!process.env.TOKEN_KEY) {
  console.warn(
    "AVISO: TOKEN_KEY não está definido no .env — o login e as rotas autenticadas vão falhar.",
  );
}

const logStream = fs.createWriteStream(path.join(__dirname, "../access.log"), {
  flags: "a",
});

const corsOptions = {
  origin(origin, callback) {
    callback(null, true);
  },
  methods: "GET,PUT,PATCH,DELETE,POST",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("combined", { stream: logStream }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

Routes(app);
app.use((req, res) => {
  res.status(404).send("404 - página não encontrada");
});

sequelize
  .authenticate()
  .then(async () => {
    console.log("Conectado ao Banco!");
    await sequelize.sync();
  })
  .catch((err) => console.log("Erro no Banco: ", err));

app.listen(process.env.API_PORT, (e) => {
  if (e) {
    return console.log(e);
  }
  console.log(`Rodando na url http://localhost:${process.env.API_PORT}`);
});
