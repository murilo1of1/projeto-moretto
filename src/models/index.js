import Pessoa from "./PessoaModel.js";
import AutomovelModel from "./AutomovelModel.js";

(async () => {
    await Pessoa.sync({ force:true });
    await AutomovelModel.sync({ force:true })
})();
