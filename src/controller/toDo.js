const TarefaModel = require('../model/tarefa-model.js');
const TarefasDAO = require('../DAO/tarefas-dao');

function tarefaController(app, bd) {
    
    const DAO = new TarefasDAO(bd)
    app.get('/tarefas', (req, res) => {
        DAO.listarTarefas()
            .then((tarefas) => res.send(tarefas))
            .catch((err) => res.send(err))
    })
    
    app.post('/tarefas', (req, res) => {
        const body = req.body
        const tarefa = new TarefaModel(0, body.titulo, body.descricao, body.status, body.datacriacao, body.id_usuario)
        console.log(tarefa);
        DAO.insereTarefa(tarefa)
            .then((tarefas) => res.send(tarefas))
            .catch((err) => res.send(err))
    })
    
    app.get('/tarefas/:nome', (req, res) => {
        const nome = req.params.nome;
        const tarefas = bd.tarefas;

        tarefas.forEach((tarefa) => {
            console.log(tarefa);
            if(nome === tarefa.nome) return res.send(tarefa)
            else res.send("E-mail não encontrado")
        })  
    })

    app.delete('/tarefas/:titulo', (req, res) => {
        const titulo = req.params.titulo
        DAO.deletarTarefa(titulo)
            .then((mensagemSucesso) => res.status(201).send(mensagemSucesso))
            .catch((mensagemErro) => res.send(mensagemErro))
    })

    app.put('/tarefas/:titulo', (req, res) => {
        const titulo = req.params.titulo
        const body = req.body
        DAO.alterarTarefa(titulo, body)
            .then((tarefa) => res.send(tarefa))
            .catch((err) => res.send(err))
    })
}

module.exports = tarefaController;