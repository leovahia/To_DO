const express = require('express');
const app = express();
const bd = require('./infra/sqlite-db.js');
const cors = require('cors');
const tarefaController = require('./controller/toDo.js');
const usuarioController = require('./controller/user.js');

app.use(express.json()) ;
app.use(cors());

tarefaController(app, bd);
usuarioController(app, bd);

app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
})