import express from 'express'
import bodyParser from 'body-parser'

import ListaController from './app/controllers/ListaController.js'

const app = express()

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
