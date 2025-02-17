class SistemaQuiz {
  constructor() {
    this.categorias = ['História', 'Ciência', 'Geografia'];
    this.niveisDificuldade = ['Fácil', 'Médio', 'Difícil'];
    this.quizzes = [];
    this.usuarios = [];
    this.perguntaAtual = null;
    this.pontuacao = 0;
    this.temporizador = null;
    this.usuarioAtual = '';
    this.indicePerguntaAtual = 0;
    this.quizAtual = null;
  }

  selecionarCategoriaEDificuldade(categoria, dificuldade) {
    this.quizAtual = this.quizzes.find(q => 
      q.categoria === categoria && 
      q.dificuldade === dificuldade
    );
    
    if (!this.quizAtual) {
      throw new Error('Combinação categoria/dificuldade não encontrada');
    }
  }

  iniciarQuiz(usuario) {
    if (!this.quizAtual) {
      throw new Error('Nenhum quiz selecionado');
    }
    
    this.usuarioAtual = usuario;
    this.pontuacao = 0;
    this.indicePerguntaAtual = 0;
    this.exibirProximaPergunta();
  }

  exibirProximaPergunta() {
    if (!this.quizAtual?.perguntas) {
      throw new Error('Nenhum quiz selecionado ou perguntas indisponíveis');
    }
    
    if (this.indicePerguntaAtual < this.quizAtual.perguntas.length) {
      this.perguntaAtual = this.quizAtual.perguntas[this.indicePerguntaAtual];
      this.iniciarTemporizador();
      this.indicePerguntaAtual++;
    } else {
      console.log('Quiz concluído!');
      this.atualizarRanking();
    }
  }

  verificarResposta(respostaUsuario) {
    clearTimeout(this.temporizador);
    
    if (respostaUsuario === this.perguntaAtual?.respostaCorreta) {
      this.pontuacao += this.perguntaAtual.pontos;
      console.log('Resposta correta!');
    } else {
      console.log('Resposta incorreta!');
    }
    
    this.exibirFeedback();
  }

  iniciarTemporizador() {
    clearTimeout(this.temporizador);
    this.temporizador = setTimeout(() => {
      console.log('Tempo esgotado!');
      this.pontuacao -= 5;
      this.exibirProximaPergunta();
    }, 30000);
  }

  criarQuiz(novoQuiz) {
    if (!this.validarQuiz(novoQuiz)) {
      throw new Error('Quiz inválido');
    }
    
    if (!this.categorias.includes(novoQuiz.categoria)) {
      this.categorias.push(novoQuiz.categoria);
    }
    
    if (!this.niveisDificuldade.includes(novoQuiz.dificuldade)) {
      this.niveisDificuldade.push(novoQuiz.dificuldade);
    }
    
    this.quizzes.push(novoQuiz);
  }

  validarQuiz(quiz) {
    return quiz.perguntas && quiz.categoria && quiz.dificuldade;
  }

  atualizarRanking() {
    this.usuarios.push({
      nome: this.usuarioAtual,
      pontuacao: this.pontuacao
    });
    
    this.usuarios.sort((a, b) => b.pontuacao - a.pontuacao);
  }

  compartilharResultado() {
    return `Eu acabei de marcar ${this.pontuacao} pontos no quiz de ${this.quizAtual?.categoria || 'Geral'}!`;
  }

  obterRanking() {
    return this.usuarios;
  }

  exibirFeedback() {
    console.log(`Pontuação atual: ${this.pontuacao}`);
  }

  reiniciarQuiz() {
    this.pontuacao = 0;
    this.indicePerguntaAtual = 0;
  }
}

module.exports = SistemaQuiz;