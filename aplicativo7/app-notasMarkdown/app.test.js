// Importa a classe do aplicativo de notas
const AplicativoDeNotas = require('./app');

// Descreve o conjunto de testes
describe('AplicativoDeNotas', () => {
  let app;

  // Executa antes de cada teste
  beforeEach(() => {
    app = new AplicativoDeNotas(); // Cria uma nova instância do aplicativo
  });

  // Teste para criar uma nova nota
  test('deve criar uma nova nota', () => {
    const nota = app.criarNota('Título 1', 'Conteúdo da nota', ['tag1']);
    expect(nota.titulo).toBe('Título 1'); // Verifica se o título está correto
    expect(nota.conteudo).toBe('Conteúdo da nota'); // Verifica se o conteúdo está correto
    expect(nota.tags).toEqual(['tag1']); // Verifica se as tags estão corretas
  });

  // Teste para editar uma nota existente
  test('deve editar uma nota existente', () => {
    const nota = app.criarNota('Título 1', 'Conteúdo da nota');
    const notaEditada = app.editarNota(nota.id, 'Novo conteúdo', ['tag2']);
    expect(notaEditada.conteudo).toBe('Novo conteúdo'); // Verifica se o conteúdo foi atualizado
    expect(notaEditada.tags).toEqual(['tag2']); // Verifica se as tags foram atualizadas
  });

  // Teste para excluir uma nota
  test('deve excluir uma nota existente', () => {
    const nota = app.criarNota('Título 1', 'Conteúdo da nota');
    app.excluirNota(nota.id);
    const notaEncontrada = app.buscarNotas('Título 1');
    expect(notaEncontrada.length).toBe(0); // Verifica se a nota foi excluída
  });

  // Teste para buscar notas por palavra-chave
  test('deve buscar notas por palavra-chave', () => {
    app.criarNota('Título 1', 'Conteúdo da nota', ['tag1']);
    app.criarNota('Título 2', 'Outro conteúdo', ['tag2']);
    const notasEncontradas = app.buscarNotas('conteúdo');
    expect(notasEncontradas.length).toBe(2); // Verifica se encontrou as notas corretas
  });

  // Teste para visualizar uma nota formatada
  test('deve visualizar uma nota formatada em HTML', () => {
    const nota = app.criarNota('Título 1', '# Título\n- Item 1');
    const html = app.visualizarNotaFormatada(nota.id);
    expect(html).toContain('<h1>Título</h1>'); // Verifica se o Markdown foi convertido corretamente
    expect(html).toContain('<ul>'); // Verifica se a lista foi convertida corretamente
  });
});
