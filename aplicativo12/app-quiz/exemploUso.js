const SistemaQuiz = require('./quiz');
const sistema = new SistemaQuiz();

try {
  // Criação do quiz
  sistema.criarQuiz({
    categoria: 'Ciência',
    dificuldade: 'Fácil',
    perguntas: [{
      enunciado: 'Quantos planetas tem nosso sistema solar?',
      opcoes: ['7', '8', '9'],
      respostaCorreta: '8',
      pontos: 10
    }]
  });

  // Seleção e início
  sistema.selecionarCategoriaEDificuldade('Ciência', 'Fácil');
  sistema.iniciarQuiz('João Silva');

  // Simulação de resposta
  sistema.verificarResposta('8');
  console.log(sistema.compartilharResultado());

  // Reinício do quiz
  sistema.reiniciarQuiz();
  console.log('\nApós reiniciar:');
  console.log('Pontuação:', sistema.pontuacao);
  console.log('Índice da pergunta:', sistema.indicePerguntaAtual);

} catch (error) {
  console.error('Erro:', error.message);
}