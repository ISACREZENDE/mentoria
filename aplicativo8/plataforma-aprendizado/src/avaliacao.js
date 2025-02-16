// --- Arquivo: avaliacao.js ---
// Classe Avaliacao - Representa um questionário com feedback
class Avaliacao {
    constructor(pergunta, respostaCorreta) {
        this.pergunta = pergunta; // Pergunta da avaliação
        this.respostaCorreta = respostaCorreta; // Resposta correta
    }
    
    // Verifica se a resposta do aluno está correta
    verificarResposta(resposta) {
        return resposta === this.respostaCorreta ? "Correto!" : "Tente novamente.";
    }
}
module.exports = Avaliacao;