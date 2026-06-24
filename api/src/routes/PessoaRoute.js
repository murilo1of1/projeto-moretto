import PessoaController from "../controllers/PessoaController.js";
import { auth, adminOnly } from "../middlewares/authMiddleware.js";

export default (app) => {
    app.get('/pessoa', auth, adminOnly, PessoaController.get);
    app.get('/pessoa/:id', auth, PessoaController.get);
    app.post('/pessoa', PessoaController.persist);
    app.patch('/pessoa/:id', auth, PessoaController.persist);
    app.delete('/pessoa/:id', auth, PessoaController.destroy);
    app.post('/login', PessoaController.login);

    app.post('/admin/pessoa', auth, adminOnly, PessoaController.createByAdmin);
};
