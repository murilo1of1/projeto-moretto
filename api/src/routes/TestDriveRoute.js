import TestDriveController from "../controllers/TestDriveController.js";
import { auth, adminOnly } from "../middlewares/authMiddleware.js";

export default (app) => {
  app.get("/testdrives", auth, TestDriveController.get);
  app.get("/testdrives/:id", auth, TestDriveController.get);
  app.post("/testdrives", auth, TestDriveController.persist);
  app.patch("/testdrives/:id", auth, adminOnly, TestDriveController.persist);
  app.delete("/testdrives/:id", auth, adminOnly, TestDriveController.destroy);
};
