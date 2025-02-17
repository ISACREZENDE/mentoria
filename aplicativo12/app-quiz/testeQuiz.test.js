const SistemaQuiz = require('./quiz');

describe('Sistema de Quiz', () => {
  let sistema;

  beforeEach(() => {
    sistema = new SistemaQuiz();
  });

  test('Deve iniciar com categorias padrão', () => {
    expect(sistema.categorias).toEqual(['História', 'Ciência', 'Geografia']);
  });

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

  test('Deve aplicar penalidade por tempo esgotado', () => {
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
    
    sistema.criarQuiz(novoQuiz);
    sistema.selecionarCategoriaEDificuldade('Temporizador Test', 'Novo Nível');
    sistema.iniciarQuiz('Teste');
    
    sistema.iniciarTemporizador();
    jest.advanceTimersByTime(30000);
    
    expect(mockConsole).toHaveBeenCalledWith('Tempo esgotado!');
    expect(sistema.pontuacao).toBe(-5);
  });

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
    
    sistema.criarQuiz(novoQuiz);
    sistema.selecionarCategoriaEDificuldade('Ranking Test', 'Fácil');
    sistema.iniciarQuiz('Maria');
    sistema.pontuacao = 15;
    sistema.atualizarRanking();
    
    expect(sistema.obterRanking()[0].pontuacao).toBe(15);
    expect(sistema.obterRanking()[0].nome).toBe('Maria');
  });

  test('Deve compartilhar resultado formatado', () => {
    const novoQuiz = {
      categoria: 'Ciência',
      dificuldade: 'Difícil',
      perguntas: []
    };
    
    sistema.criarQuiz(novoQuiz);
    sistema.selecionarCategoriaEDificuldade('Ciência', 'Difícil');
    sistema.pontuacao = 75;
    
    expect(sistema.compartilharResultado()).toBe(
      'Eu acabei de marcar 75 pontos no quiz de Ciência!'
    );
  });

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

    sistema.criarQuiz(novoQuiz);
    sistema.selecionarCategoriaEDificuldade('Reinício Teste', 'Médio');
    sistema.iniciarQuiz('João');
    
    // Modifica o estado
    sistema.pontuacao = 15;
    sistema.indicePerguntaAtual = 1;

    sistema.reiniciarQuiz();

    expect(sistema.pontuacao).toBe(0);
    expect(sistema.indicePerguntaAtual).toBe(0);
  });
});