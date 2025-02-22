const PlataformaBlog = require('../js/plataforma.js'); // Importa com CommonJS

describe('PlataformaBlog', () => {
  let plataforma;

  beforeEach(() => {
    plataforma = PlataformaBlog;
    plataforma.postagens = []; // Limpa as postagens antes de cada teste
  });

  // ... (Testes para criarPostagem, adicionarComentario, encontrarPostagem, buscarPostagens, notificar, compartilharPostagem, exibirEstatisticas - tudo igual à resposta anterior)

  describe('outras funcionalidades', () => {
    it('deve permitir editar uma postagem', () => {
      const postagem = plataforma.criarPostagem('Título', 'Conteúdo');
      const novaPostagem = plataforma.editarPostagem(postagem.id, 'Novo Título', 'Novo Conteúdo');
      expect(novaPostagem.titulo).toBe('Novo Título');
      expect(novaPostagem.conteudo).toBe('Novo Conteúdo');
    });

    it('deve permitir excluir uma postagem', () => {
      const postagem = plataforma.criarPostagem('Título', 'Conteúdo');
      plataforma.excluirPostagem(postagem.id);
      expect(plataforma.postagens).toEqual([]);
    });

    it('deve permitir adicionar categorias a uma postagem', () => {
      const postagem = plataforma.criarPostagem('Título', 'Conteúdo');
      plataforma.adicionarCategoria(postagem.id, 'Nova Categoria');
      expect(postagem.categorias).toContain('Nova Categoria');
    });

    it('deve permitir remover categorias de uma postagem', () => {
      const postagem = plataforma.criarPostagem('Título', 'Conteúdo', ['Categoria 1']);
      plataforma.removerCategoria(postagem.id, 'Categoria 1');
      expect(postagem.categorias).toEqual([]);
    });

    it('deve permitir adicionar tags a uma postagem', () => {
      const postagem = plataforma.criarPostagem('Título', 'Conteúdo');
      plataforma.adicionarTag(postagem.id, 'Nova Tag');
      expect(postagem.tags).toContain('Nova Tag');
    });

    it('deve permitir remover tags de uma postagem', () => {
      const postagem = plataforma.criarPostagem('Título', 'Conteúdo', [], ['Tag 1']);
      plataforma.removerTag(postagem.id, 'Tag 1');
      expect(postagem.tags).toEqual([]);
    });
  });
});
