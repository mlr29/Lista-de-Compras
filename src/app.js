import express from 'express'
import bodyParser from 'body-parser'

import ListaController from './app/controllers/ListaController.js'

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite qualquer origem
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// //indicar para o express ler body como json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  ROTAS
app.get('/lista', ListaController.index)
app.post('/lista', ListaController.store)
app.get('/lista/:id', ListaController.show)
app.put('/lista/:id', ListaController.update)
app.delete('/lista/:id', ListaController.delete)

export default app
