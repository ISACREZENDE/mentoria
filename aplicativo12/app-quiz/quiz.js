/**
 * CLASSE PRINCIPAL DO SISTEMA DE QUIZ
 * Gerencia todas as operações do sistema de quizzes
 */
class SistemaQuiz {
  constructor() {
    // Lista inicial de categorias disponíveis
    this.categorias = ['História', 'Ciência', 'Geografia'];
    
    // Níveis de dificuldade pré-definidos
    this.niveisDificuldade = ['Fácil', 'Médio', 'Difícil'];
    
    // Armazenamento de todos os quizzes cadastrados
    this.quizzes = [];
    
    // Registro de usuários e pontuações (ranking)
    this.usuarios = [];
    
    // Referência da pergunta sendo exibida atualmente
    this.perguntaAtual = null;
    
    // Pontuação acumulada do jogador atual
    this.pontuacao = 0;
    
    // Controle do temporizador da pergunta atual
    this.temporizador = null;
    
    // Nome do usuário participando do quiz atual
    this.usuarioAtual = '';
    
    // Índice da pergunta atual no array de perguntas
    this.indicePerguntaAtual = 0;
    
    // Quiz selecionado para jogar
    this.quizAtual = null;
  }

  /**
   * SELECIONA QUIZ POR CATEGORIA E DIFICULDADE
   * @param {string} categoria - Nome da categoria desejada
   * @param {string} dificuldade - Nível de dificuldade escolhido
   * @throws {Error} Se não encontrar combinação válida
   */
  selecionarCategoriaEDificuldade(categoria, dificuldade) {
    // Procura quiz correspondente aos parâmetros
    this.quizAtual = this.quizzes.find(q => 
      q.categoria === categoria && 
      q.dificuldade === dificuldade
    );
    
    // Valida se encontrou o quiz
    if (!this.quizAtual) {
      throw new Error('Combinação categoria/dificuldade não encontrada');
    }
  }

  /**
   * INICIA UM NOVO QUIZ PARA UM USUÁRIO
   * @param {string} usuario - Nome do jogador
   * @throws {Error} Se nenhum quiz estiver selecionado
   */
  iniciarQuiz(usuario) {
    // Validação de quiz selecionado
    if (!this.quizAtual) {
      throw new Error('Nenhum quiz selecionado');
    }
    
    // Configura estado inicial
    this.usuarioAtual = usuario;
    this.pontuacao = 0;
    this.indicePerguntaAtual = 0;
    this.exibirProximaPergunta();
  }

  /**
   * EXIBE A PRÓXIMA PERGUNTA DO QUIZ
   * @throws {Error} Se não houver perguntas disponíveis
   */
  exibirProximaPergunta() {
    // Valida se há quiz e perguntas disponíveis
    if (!this.quizAtual?.perguntas) {
      throw new Error('Nenhum quiz selecionado ou perguntas indisponíveis');
    }
    
    // Verifica se ainda há perguntas
    if (this.indicePerguntaAtual < this.quizAtual.perguntas.length) {
      // Atualiza pergunta atual e inicia temporizador
      this.perguntaAtual = this.quizAtual.perguntas[this.indicePerguntaAtual];
      this.iniciarTemporizador();
      this.indicePerguntaAtual++;
    } else {
      // Finaliza quiz quando não há mais perguntas
      console.log('Quiz concluído!');
      this.atualizarRanking();
    }
  }

  /**
   * VERIFICA RESPOSTA DO USUÁRIO
   * @param {string} respostaUsuario - Resposta fornecida pelo jogador
   */
  verificarResposta(respostaUsuario) {
    // Cancela temporizador atual
    clearTimeout(this.temporizador);
    
    // Verifica resposta correta
    if (respostaUsuario === this.perguntaAtual?.respostaCorreta) {
      this.pontuacao += this.perguntaAtual.pontos;
      console.log('Resposta correta!');
    } else {
      console.log('Resposta incorreta!');
    }
    
    // Exibe feedback e prepara próxima pergunta
    this.exibirFeedback();
  }

  /**
   * INICIA TEMPORIZADOR PARA PERGUNTA ATUAL (30 segundos)
   */
  iniciarTemporizador() {
    // Limpa temporizador anterior
    clearTimeout(this.temporizador);
    
    // Configura novo temporizador
    this.temporizador = setTimeout(() => {
      console.log('Tempo esgotado!');
      this.pontuacao -= 5; // Penalidade
      this.exibirProximaPergunta();
    }, 30000);
  }

  /**
   * CADASTRA NOVO QUIZ NO SISTEMA
   * @param {object} novoQuiz - Objeto contendo dados do novo quiz
   * @throws {Error} Se quiz for inválido
   */
  criarQuiz(novoQuiz) {
    // Valida estrutura do quiz
    if (!this.validarQuiz(novoQuiz)) {
      throw new Error('Quiz inválido');
    }
    
    // Adiciona nova categoria se necessário
    if (!this.categorias.includes(novoQuiz.categoria)) {
      this.categorias.push(novoQuiz.categoria);
    }
    
    // Adiciona novo nível de dificuldade se necessário
    if (!this.niveisDificuldade.includes(novoQuiz.dificuldade)) {
      this.niveisDificuldade.push(novoQuiz.dificuldade);
    }
    
    // Armazena o novo quiz
    this.quizzes.push(novoQuiz);
  }

  /**
   * VALIDA ESTRUTURA DE UM QUIZ
   * @param {object} quiz - Objeto quiz a ser validado
   * @returns {boolean} Verdadeiro se quiz for válido
   */
  validarQuiz(quiz) {
    return quiz.perguntas && quiz.categoria && quiz.dificuldade;
  }

  /**
   * ATUALIZA RANKING COM A PONTUAÇÃO ATUAL
   */
  atualizarRanking() {
    // Adiciona novo registro
    this.usuarios.push({
      nome: this.usuarioAtual,
      pontuacao: this.pontuacao
    });
    
    // Ordena por pontuação decrescente
    this.usuarios.sort((a, b) => b.pontuacao - a.pontuacao);
  }

  /**
   * GERA MENSAGEM PARA COMPARTILHAMENTO
   * @returns {string} Mensagem formatada
   */
  compartilharResultado() {
    return `Eu acabei de marcar ${this.pontuacao} pontos no quiz de ${this.quizAtual?.categoria || 'Geral'}!`;
  }

  /**
   * RETORNA DADOS DO RANKING
   * @returns {array} Lista ordenada de usuários
   */
  obterRanking() {
    return this.usuarios;
  }

  /**
   * EXIBE FEEDBACK DA PONTUAÇÃO ATUAL
   */
  exibirFeedback() {
    console.log(`Pontuação atual: ${this.pontuacao}`);
  }

  /**
   * REINICIA ESTADO DO QUIZ ATUAL
   */
  reiniciarQuiz() {
    this.pontuacao = 0;
    this.indicePerguntaAtual = 0;
  }
}

// Exporta a classe para uso em outros módulos
module.exports = SistemaQuiz;