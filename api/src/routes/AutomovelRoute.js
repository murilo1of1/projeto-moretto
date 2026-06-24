import AutomovelController from "../controllers/AutomovelController.js";
import { auth, adminOnly } from "../middlewares/authMiddleware.js";
import FotoController from "../controllers/FotoController.js";
import { uploadFotos as uploadFotosMiddleware } from "../middlewares/uploadMiddlewares.js";

export default (app) => {
  app.get("/automoveis", AutomovelController.get);
  app.get("/automoveis/:id", AutomovelController.get);
  app.post("/automoveis", auth, adminOnly, AutomovelController.persist);
  app.patch("/automoveis/:id", auth, adminOnly, AutomovelController.persist);
  app.post(
    "/automoveis/:id/fotos",
    auth,
    adminOnly,
    uploadFotosMiddleware.array("fotos", 10),
    FotoController.uploadFotos,
  );
  app.delete("/automoveis/:id", auth, adminOnly, AutomovelController.destroy);
  app.delete(
    "/automoveis/:id/fotos/:fotoId",
    auth,
    adminOnly,
    FotoController.destroyFoto,
  );
};
