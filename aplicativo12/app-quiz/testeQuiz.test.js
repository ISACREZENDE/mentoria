// Importa a classe principal do sistema
const SistemaQuiz = require('./quiz');

// Bloco principal de testes
describe('Sistema de Quiz', () => {
  let sistema;

  // Executado antes de cada teste para resetar o estado
  beforeEach(() => {
    sistema = new SistemaQuiz();
  });

  /**
   * TESTE: Verificação das categorias iniciais
   */
  test('Deve iniciar com categorias padrão', () => {
    expect(sistema.categorias).toEqual(['História', 'Ciência', 'Geografia']);
  });

  /**
   * TESTE: Criação de novo quiz válido
   */
  test('Deve permitir criar novo quiz válido', () => {
    const novoQuiz = {
      categoria: 'Literatura',
      dificuldade: 'Avançado',
      perguntas: [{
        enunciado: 'Quem escreveu Dom Quixote?',
        opcoes: ['Cervantes', 'Shakespeare', 'Dostoiévski'],
        respostaCorreta: 'Cervantes',
        pontos: 15
      }]
    };
    
    sistema.criarQuiz(novoQuiz);
    expect(sistema.quizzes.length).toBe(1);
    expect(sistema.categorias).toContain('Literatura');
    expect(sistema.niveisDificuldade).toContain('Avançado');
  });

  /**
   * TESTE: Penalidade por tempo esgotado
   */
  test('Deve aplicar penalidade por tempo esgotado', () => {
    // Configura ambiente de teste com timer falso
    jest.useFakeTimers();
    const mockConsole = jest.spyOn(console, 'log');
    
    const novoQuiz = {
      categoria: 'Temporizador Test',
      dificuldade: 'Novo Nível',
      perguntas: [{
        enunciado: 'Pergunta teste',
        opcoes: ['A', 'B', 'C'],
        respostaCorreta: 'A',
        pontos: 10
      }]
    };
    
    // Executa fluxo completo
    sistema.criarQuiz(novoQuiz);
    sistema.selecionarCategoriaEDificuldade('Temporizador Test', 'Novo Nível');
    sistema.iniciarQuiz('Teste');
    
    // Simula passagem de tempo
    sistema.iniciarTemporizador();
    jest.advanceTimersByTime(30000);
    
    // Verifica resultados
    expect(mockConsole).toHaveBeenCalledWith('Tempo esgotado!');
    expect(sistema.pontuacao).toBe(-5);
  });

  /**
   * TESTE: Atualização correta do ranking
   */
  test('Deve atualizar ranking corretamente', () => {
    const novoQuiz = {
      categoria: 'Ranking Test',
      dificuldade: 'Fácil',
      perguntas: [{
        enunciado: 'Pergunta teste',
        opcoes: ['A', 'B', 'C'],
        respostaCorreta: 'A',
        pontos: 10
      }]
    };
    
    // Executa fluxo completo
    sistema.criarQuiz(novoQuiz);
    sistema.selecionarCategoriaEDificuldade('Ranking Test', 'Fácil');
    sistema.iniciarQuiz('Maria');
    sistema.pontuacao = 15;
    sistema.atualizarRanking();
    
    // Verifica dados no ranking
    expect(sistema.obterRanking()[0].pontuacao).toBe(15);
    expect(sistema.obterRanking()[0].nome).toBe('Maria');
  });

  /**
   * TESTE: Formatação do compartilhamento
   */
  test('Deve compartilhar resultado formatado', () => {
    const novoQuiz = {
      categoria: 'Ciência',
      dificuldade: 'Difícil',
      perguntas: []
    };
    
    // Configura ambiente
    sistema.criarQuiz(novoQuiz);
    sistema.selecionarCategoriaEDificuldade('Ciência', 'Difícil');
    sistema.pontuacao = 75;
    
    // Verifica mensagem exata
    expect(sistema.compartilharResultado()).toBe(
      'Eu acabei de marcar 75 pontos no quiz de Ciência!'
    );
  });

  /**
   * TESTE: Reinício do quiz
   */
  test('Deve reiniciar o quiz corretamente', () => {
    const novoQuiz = {
      categoria: 'Reinício Teste',
      dificuldade: 'Médio',
      perguntas: [{
        enunciado: 'Qual a capital da França?',
        opcoes: ['Londres', 'Paris', 'Berlim'],
        respostaCorreta: 'Paris',
        pontos: 10
      }]
    };

    // Configuração inicial
    sistema.criarQuiz(novoQuiz);
    sistema.selecionarCategoriaEDificuldade('Reinício Teste', 'Médio');
    sistema.iniciarQuiz('João');
    
    // Modifica estado
    sistema.pontuacao = 15;
    sistema.indicePerguntaAtual = 1;

    // Executa reinício
    sistema.reiniciarQuiz();

    // Verifica reset
    expect(sistema.pontuacao).toBe(0);
    expect(sistema.indicePerguntaAtual).toBe(0);
  });
});