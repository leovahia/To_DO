const UsuarioModel = require('../model/usuario-model.js')
const UsuarioDAO = require('../DAO/usuarios-dao')

function usuarioController(app, bd) {
    
    const DAO = new UsuarioDAO(bd)
    app.get('/usuario', (req, res) => {
        DAO.listarTarefas()
            .then((tarefas) => res.send(tarefas))
            .catch((err) => res.send(err))
    })

    app.get('/usuario/:email', (req, res) => {
        const email = req.params.email
        DAO.listarApenasUmUsuario(email)
            .then((usuario) => res.send(usuario))
            .catch((err) => res.send(err))
    })

    app.post('/usuario', (req, res) => {
        const body = req.body
        const usuario = new UsuarioModel(0, body.nome, body.email, body.senha)
        DAO.insereUsuario(usuario)
            .then((usuario) => res.send(usuario))
            .catch((err) => res.send(`${err}`))
    })

    app.delete( '/usuario/:email', (req, res) => {
        const email = req.params.email;
        DAO.deletarUsuario(email)
            .then((usuario) => res.send(usuario))
            .catch((err) => res.send(`${err}`))
    })

    app.put('/usuario/:email', (req, res) => {
        const email = req.params.email
        const body = req.body
        DAO.alterarUsuario(email, body)
            .then((usuario) => res.send(usuario))
            .catch((err) => res.send(err))
    })
}

module.exports = usuarioController;