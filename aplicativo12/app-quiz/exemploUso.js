// Importa a classe principal
const SistemaQuiz = require('./quiz');

// Cria instância do sistema
const sistema = new SistemaQuiz();

// Bloco try/catch para tratamento de erros
try {
  // 1. CRIAÇÃO DE QUIZ
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

  // 2. SELEÇÃO DE CATEGORIA/DIFICULDADE
  sistema.selecionarCategoriaEDificuldade('Ciência', 'Fácil');

  // 3. INÍCIO DO QUIZ
  sistema.iniciarQuiz('João Silva');

  // 4. SIMULAÇÃO DE RESPOSTA CORRETA
  sistema.verificarResposta('8');
  
  // 5. EXIBE RESULTADO
  console.log(sistema.compartilharResultado());

  // 6. DEMONSTRA REINÍCIO
  sistema.reiniciarQuiz();
  console.log('\nApós reiniciar:');
  console.log('Pontuação:', sistema.pontuacao);
  console.log('Índice da pergunta:', sistema.indicePerguntaAtual);

} catch (error) {
  // Captura e exibe erros
  console.error('Ocorreu um erro:', error.message);
}