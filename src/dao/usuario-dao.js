module.exports = class UsuariosDAO {
    
    constructor(bd) {
        this.bd = bd;
    }

    async listarUsuarios() {
        return new Promise((res, rej) => {
            this.bd.all("SELECT * FROM USUARIOS",
            (err, usuarios) => {
                if(err) rej(err)
                else res(usuarios)
            })
        })
        
    }

    listarApenasUmUsuario(email) {
        return new Promise((res, rej) => {
            this.bd.all("SELECT * FROM USUARIOS WHERE EMAIL = (?)",
            [email],
            (err, usuarios) => {
                if (err) rej(err);
                else res(usuarios);
            });
        });
    }

    insereUsuario(usuario) {
        return new Promise((res, rej) => {
            this.bd.run('INSERT INTO USUARIOS (NOME, EMAIL, SENHA) VALUES (?,?,?)'
            , [usuario.nome, usuario.email, usuario.senha]
            , (err) => {
                if(err) rej('Falha ao tentar inserir usuário')
                else res('Usuário inserido com sucesso')
            })
        })
    }

    alterarUsuario(email, body) {
        return new Promise((res, rej) => {
            this.bd.run('UPDATE USUARIOS SET NOME = (?), SENHA = (?) WHERE EMAIL = (?)'
            , [body.nome, body.email, email]
            , (err) => {
                if(err) rej('Falha ao tentar alterar o usuário')
                else res('Usuário alterado com sucesso')
            })
        })
    }

    deletarUsuario(usuario) {
        return new Promise((res, rej) => {
            this.bd.run('DELETE FROM USUARIOS WHERE EMAIL = (?)'
            , [usuario]
            , (err) => {
                if(err) rej('Falha ao tentar deletar o usuário')
                else res('Usuário deletado com sucesso')
            })
        })
    }
}