// --- Arquivo: forum.js ---
// Classe Forum - Gerencia mensagens entre alunos e instrutores
class Forum {
    constructor() {
        this.mensagens = []; // Lista de mensagens no fórum
    }
    
    // Adiciona uma mensagem ao fórum
    adicionarMensagem(usuario, mensagem) {
        this.mensagens.push({ usuario, mensagem });
    }
}
module.exports = Forum;