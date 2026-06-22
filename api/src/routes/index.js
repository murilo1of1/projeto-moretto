import PessoaRoute from "./PessoaRoute.js";
import AutomovelRoute from "./AutomovelRoute.js";
import TestDriveRoute from "./TestDriveRoute.js";

function Routes(app) {
  PessoaRoute(app);
  AutomovelRoute(app);
  TestDriveRoute(app);
}

export default Routes;
