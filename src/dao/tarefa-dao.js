module.exports = class TarefasDAO {

    constructor(bd) {
        this.bd = bd;
    }

    listarTarefas() {
        return new Promise((res, rej) => {
            this.bd.all('SELECT * FROM TAREFAS',
            (err, tarefas) => {
                if(err) rej(err)     
                else res(tarefas) 
            })

        } 
    )}

    insereTarefa(tarefa) {
        return new Promise((res, rej) => {
            this.bd.run('INSERT INTO TAREFAS (TITULO, DESCRICAO, STATUS, DATACRIACAO, ID_USUARIO) VALUES (?,?,?,?,?)'
            , [tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.datacriacao, tarefa.id_usuario]
            , (err) => {
                if(err) rej('Falha ao inserir tarefa')
                else res('Tarefa inserida com sucesso')
            })
        })
    }

    alterarTarefa(tarefa, body) {
        return new Promise((res, rej) => {
            this.bd.run('UPDATE TAREFAS SET DESCRICAO = (?), STATUS = (?) WHERE TITULO = (?)'
            , [body.descricao, body.status, tarefa ]
            , (err) => {
                if(err) rej('Falha ao alterar a tarefa')
                else res('Tarefa alterada com sucesso')
            })
        })
    }

    deletarTarefa(tarefa) {
        return new Promise((res, rej) => {
            this.bd.run('DELETE FROM TAREFAS WHERE TITULO = (?)'
            , [tarefa]
            , (err) => {
                if(err) rej('Falha ao deletar a tarefa')
                else res('Tarefa deletada com sucesso')
            })
        })
    }
}