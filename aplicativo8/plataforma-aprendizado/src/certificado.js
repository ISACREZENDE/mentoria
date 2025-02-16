// --- Arquivo: certificado.js ---
// Classe Certificado - Gera um certificado para alunos aprovados
class Certificado {
    static gerar(aluno, curso) {
        return `Certificado: ${aluno.nome} concluiu o curso ${curso.nome}.`;
    }
}
module.exports = Certificado;