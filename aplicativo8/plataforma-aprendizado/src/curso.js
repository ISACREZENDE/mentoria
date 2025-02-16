
// --- Arquivo: curso.js ---
// Classe Curso - Representa um curso com módulos e alunos inscritos
class Curso {
    constructor(nome, instrutor) {
        this.nome = nome; // Nome do curso
        this.instrutor = instrutor; // Nome do instrutor
        this.modulos = []; // Lista de módulos do curso
        this.alunos = []; // Lista de alunos inscritos no curso
    }
    
    // Adiciona um módulo ao curso
    adicionarModulo(modulo) {
        this.modulos.push(modulo);
    }
    
    // Inscreve um aluno no curso
    inscreverAluno(aluno) {
        this.alunos.push(aluno);
    }
}
module.exports = Curso;