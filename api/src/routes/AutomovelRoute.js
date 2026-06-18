import AutomovelController from "../controllers/AutomovelController.js";
import FotoController from "../controllers/FotoController.js";
import { uploadFotos as uploadFotosMiddleware } from "../middlewares/uploadMiddlewares.js";

export default (app) => {
  app.get("/automoveis", AutomovelController.get);
  app.get("/automoveis/:id", AutomovelController.get);
  app.post("/automoveis", AutomovelController.persist);
  app.patch("/automoveis/:id", AutomovelController.persist);
  app.post(
    "/automoveis/:id/fotos",
    uploadFotosMiddleware.array("fotos", 10),
    FotoController.uploadFotos,
  );
  app.delete("/automoveis/:id", AutomovelController.destroy);
  app.delete("/automoveis/:id/fotos/:fotoId", FotoController.destroyFoto);
};
