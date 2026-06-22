import PessoaController from "../controllers/PessoaController.js";
import { auth, adminOnly } from "../middlewares/authMiddleware.js";

export default (app) => {
    app.get('/pessoa', PessoaController.get);
    app.get('/pessoa/:id', PessoaController.get);
    app.post('/pessoa', PessoaController.persist);
    app.patch('/pessoa/:id', PessoaController.persist);
    app.delete('/pessoa/:id', PessoaController.destroy);
    app.post('/login', PessoaController.login);

    app.post('/admin/pessoa', auth, adminOnly, PessoaController.createByAdmin);
};