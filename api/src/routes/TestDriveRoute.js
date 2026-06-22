import TestDriveController from "../controllers/TestDriveController.js";
import { auth, adminOnly } from "../middlewares/authmiddleware.js";

export default (app) => {
  app.get("/testdrives", TestDriveController.get);
  app.get("/testdrives/:id", TestDriveController.get);
  app.post("/testdrives", auth, TestDriveController.persist);
  app.patch("/testdrives/:id", auth, adminOnly, TestDriveController.persist);
  app.delete("/testdrives/:id", auth, adminOnly, TestDriveController.destroy);
};
