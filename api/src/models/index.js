import Pessoa from "./PessoaModel.js";
import Automovel from "./AutomovelModel.js";
import TestDrive from "./TestDriveModel.js";

(async () => {
    await Pessoa.sync({ force:true });
    await Automovel.sync({ force:true });
    await TestDrive.sync({ force:true })
})();
