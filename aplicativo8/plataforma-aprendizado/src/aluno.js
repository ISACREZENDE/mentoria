// --- Arquivo: aluno.js ---
// Classe Aluno - Representa um aluno que pode se inscrever em cursos
class Aluno {
    constructor(nome) {
        this.nome = nome; // Nome do aluno
        this.cursos = []; // Lista de cursos em que o aluno está inscrito
    }
    
    // Inscreve o aluno em um curso específico
    inscrever(curso) {
        curso.inscreverAluno(this);
        this.cursos.push(curso);
    }
}
module.exports = Aluno;