// Classe para representar um usuário
class Usuario {
    constructor(nome, email, senha) {
        this.nome = nome; // Nome do usuário
        this.email = email; // Email do usuário
        this.senha = senha; // Senha do usuário
        this.amigos = []; // Lista de amigos
        this.seguindo = []; // Lista de usuários que o usuário segue
        this.postagens = []; // Lista de postagens do usuário
        this.mensagens = []; // Lista de mensagens recebidas
        this.notificacoes = []; // Lista de notificações
        this.privacidade = "publico"; // Configuração de privacidade (público ou privado)
    }

    // Método para adicionar um amigo
    adicionarAmigo(usuario) {
        if (!this.amigos.includes(usuario)) {
            this.amigos.push(usuario); // Adiciona o usuário à lista de amigos
            usuario.amigos.push(this); // Adiciona o usuário atual à lista de amigos do outro usuário
            console.log(`${this.nome} e ${usuario.nome} agora são amigos!`);
        } else {
            console.log(`${usuario.nome} já é seu amigo.`);
        }
    }

    // Método para seguir outro usuário
    seguirUsuario(usuario) {
        if (!this.seguindo.includes(usuario)) {
            this.seguindo.push(usuario); // Adiciona o usuário à lista de seguindo
            console.log(`${this.nome} começou a seguir ${usuario.nome}.`);
        } else {
            console.log(`${this.nome} já segue ${usuario.nome}.`);
        }
    }

    // Método para postar uma atualização
    postarAtualizacao(conteudo, tipo = "texto") {
        const postagem = { conteudo, tipo, curtidas: 0, comentarios: [] };
        this.postagens.push(postagem); // Adiciona a postagem à lista de postagens
        console.log(`${this.nome} postou: ${conteudo}`);
    }

    // Método para curtir uma postagem
    curtirPostagem(usuario, indicePostagem) {
        const postagem = usuario.postagens[indicePostagem];
        if (postagem) {
            postagem.curtidas += 1; // Incrementa o número de curtidas
            usuario.notificacoes.push(`${this.nome} curtiu sua postagem: ${postagem.conteudo}`);
            console.log(`${this.nome} curtiu a postagem de ${usuario.nome}.`);
        } else {
            console.log("Postagem não encontrada.");
        }
    }

    // Método para comentar em uma postagem
    comentarPostagem(usuario, indicePostagem, comentario) {
        const postagem = usuario.postagens[indicePostagem];
        if (postagem) {
            postagem.comentarios.push(comentario); // Adiciona o comentário à postagem
            usuario.notificacoes.push(`${this.nome} comentou na sua postagem: ${comentario}`);
            console.log(`${this.nome} comentou na postagem de ${usuario.nome}.`);
        } else {
            console.log("Postagem não encontrada.");
        }
    }

    // Método para enviar uma mensagem direta
    enviarMensagem(usuario, mensagem) {
        if (this.amigos.includes(usuario) || this.privacidade === "publico") {
            usuario.mensagens.push({ de: this.nome, mensagem }); // Adiciona a mensagem à lista de mensagens do usuário
            console.log(`${this.nome} enviou uma mensagem para ${usuario.nome}.`);
        } else {
            console.log(`${usuario.nome} não está na sua lista de amigos ou o perfil é privado.`);
        }
    }

    // Método para alterar a configuração de privacidade
    alterarPrivacidade(privacidade) {
        this.privacidade = privacidade; // Atualiza a configuração de privacidade
        console.log(`${this.nome} alterou a privacidade para ${privacidade}.`);
    }

    // Método para ver notificações
    verNotificacoes() {
        if (this.notificacoes.length > 0) {
            console.log(`Notificações de ${this.nome}:`);
            this.notificacoes.forEach((notificacao, index) => {
                console.log(`${index + 1}. ${notificacao}`);
            });
        } else {
            console.log(`${this.nome} não tem novas notificações.`);
        }
    }
    enviarMensagem(usuario, mensagem) {
        if (this.amigos.includes(usuario) || this.privacidade === "publico") {
            usuario.mensagens.push({ de: this.nome, mensagem });
            usuario.notificacoes.push(`${this.nome} enviou uma mensagem para você: ${mensagem}`); // Adiciona notificação
            console.log(`${this.nome} enviou uma mensagem para ${usuario.nome}.`);
        } else {
            console.log(`${usuario.nome} não está na sua lista de amigos ou o perfil é privado.`);
        }
    }
}

// Exporta a classe Usuario para ser usada em outros arquivos
module.exports = Usuario;