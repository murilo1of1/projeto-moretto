import PessoaRoute from "./PessoaRoute.js";
import AutomovelRoute from "./AutomovelRoute.js";

function Routes(app) {
    PessoaRoute(app);
    AutomovelRoute(app);
}

export default Routes;