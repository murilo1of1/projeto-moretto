import AutomovelController from '../controllers/AutomovelController.js';

export default (app) => {
app.get('/automoveis', AutomovelController.get);
app.get('/automoveis/:id', AutomovelController.get);
app.post('/automoveis', AutomovelController.persist);
app.patch('/automoveis/:id', AutomovelController.persist);
app.delete('/automoveis/:id', AutomovelController.destroy);
};

