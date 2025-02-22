const PlataformaBlog = {
  postagens: [],

  criarPostagem: function(titulo, conteudo, categorias = [], tags = []) {
    const postagem = {
      id: this.gerarIdUnico(),
      titulo,
      conteudo,
      categorias,
      tags,
      comentarios: [],
      dataCriacao: new Date()
    };
    this.postagens.push(postagem);
    return postagem;
  },

  gerarIdUnico: function() {
    // Implementação simplificada de geração de ID
    return Math.random().toString(36).substring(2, 15);
  },

  adicionarComentario: function(postagemId, autor, texto) {
    const postagem = this.encontrarPostagem(postagemId);
    if (postagem) {
      const comentario = {
        autor,
        texto,
        dataCriacao: new Date()
      };
      postagem.comentarios.push(comentario);
      return comentario;
    }
    return null;
  },

  encontrarPostagem: function(id) {
    return this.postagens.find(postagem => postagem.id === id);
  },

  buscarPostagens: function(termo) {
    const termoLower = termo.toLowerCase(); // Busca case-insensitive
    return this.postagens.filter(postagem =>
      postagem.titulo.toLowerCase().includes(termoLower) ||
      postagem.conteudo.toLowerCase().includes(termoLower)
    );
  },

  notificar: function(evento, dados) {
    // Simulação de notificação (substitua pela sua implementação)
    console.log("Evento:", evento, dados);
  },

  compartilharPostagem: function(postagem, redeSocial) {
    console.log(`Postagem "${postagem.titulo}" compartilhada no ${redeSocial}`);
  },

  exibirEstatisticas: function() {
    console.log("Estatísticas de visualização (simulado):");
    console.log("Total de postagens:", this.postagens.length);
  },

  editarPostagem: function(id, novoTitulo, novoConteudo) {
    const postagem = this.encontrarPostagem(id);
    if (postagem) {
      postagem.titulo = novoTitulo;
      postagem.conteudo = novoConteudo;
      return postagem;
    }
    return null;
  },

  excluirPostagem: function(id) {
    this.postagens = this.postagens.filter(postagem => postagem.id !== id);
  },

  adicionarCategoria: function(id, novaCategoria) {
    const postagem = this.encontrarPostagem(id);
    if (postagem) {
      postagem.categorias.push(novaCategoria);
    }
  },

  removerCategoria: function(id, categoria) {
    const postagem = this.encontrarPostagem(id);
    if (postagem) {
      postagem.categorias = postagem.categorias.filter(cat => cat !== categoria);
    }
  },

  adicionarTag: function(id, novaTag) {
    const postagem = this.encontrarPostagem(id);
    if (postagem) {
      postagem.tags.push(novaTag);
    }
  },

  removerTag: function(id, tag) {
    const postagem = this.encontrarPostagem(id);
    if (postagem) {
      postagem.tags = postagem.tags.filter(tg => tg !== tag);
    }
  },

  criarPostagemInterativa: function() {
    const titulo = prompt("Digite o título da postagem:");
    const conteudo = prompt("Digite o conteúdo da postagem:");
    const categorias = prompt("Digite as categorias (separadas por vírgula):").split(",");
    const tags = prompt("Digite as tags (separadas por vírgula):").split(",");

    const postagem = this.criarPostagem(titulo, conteudo, categorias, tags);

    console.log("Postagem criada com sucesso:", postagem);
  },

  adicionarComentarioInterativo: function(postagemId) {
    const autor = prompt("Digite seu nome:");
    const texto = prompt("Digite seu comentário:");

    const comentario = this.adicionarComentario(postagemId, autor, texto);

    if (comentario) {
      console.log("Comentário adicionado com sucesso:", comentario);
    } else {
      console.log("Erro ao adicionar comentário. Postagem não encontrada.");
    }
  },

  buscarPostagensInterativo: function() {
    const termo = prompt("Digite o termo de busca:");
    const resultados = this.buscarPostagens(termo);

    if (resultados.length > 0) {
      console.log("Resultados da busca:", resultados);
    } else {
      console.log("Nenhuma postagem encontrada para o termo:", termo);
    }
  },

  // ... (outras funções de interação)
};

module.exports = PlataformaBlog; // Exporta com CommonJS