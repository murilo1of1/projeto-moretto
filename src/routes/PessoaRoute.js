import PessoaController from "../controllers/PessoaController.js";

export default (app) => {
    app.get('/pessoa', PessoaController.get);
    app.get('/pessoa/:id', PessoaController.get);
    app.post('/pessoa', PessoaController.persist);
    app.patch('/pessoa/:id', PessoaController.persist);
    app.delete('/pessoa/:id', PessoaController.destroy);
    app.post('/login', PessoaController.login);
};