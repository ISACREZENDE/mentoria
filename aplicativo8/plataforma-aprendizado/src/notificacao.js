// --- Arquivo: notificacao.js ---
// Classe Notificacao - Envia notificações para os alunos
class Notificacao {
    static enviar(aluno, mensagem) {
        console.log(`Notificação para ${aluno.nome}: ${mensagem}`);
    }
}
module.exports = Notificacao;