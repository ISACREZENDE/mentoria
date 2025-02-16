// --- Arquivo: modulo.js ---
// Classe Modulo - Representa um módulo dentro de um curso
class Modulo {
    constructor(nome) {
        this.nome = nome; // Nome do módulo
        this.licoes = []; // Lista de lições dentro do módulo
    }
    
    // Adiciona uma lição ao módulo
    adicionarLicao(licao) {
        this.licoes.push(licao);
    }
}
module.exports = Modulo;