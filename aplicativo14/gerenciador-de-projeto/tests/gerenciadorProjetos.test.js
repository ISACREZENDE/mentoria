// Importa a classe GerenciadorProjetos do arquivo correspondente
const { GerenciadorProjetos } = require('../src/gerenciadorProjetos');

// Inicia um conjunto de testes para a classe GerenciadorProjetos
describe('GerenciadorProjetos', () => {
  let gerenciador; // Declara uma variável para armazenar a instância do gerenciador de projetos

  // Antes de cada teste, cria uma nova instância de GerenciadorProjetos
  beforeEach(() => {
    gerenciador = new GerenciadorProjetos();
  });

  // Teste para verificar se um novo projeto é criado corretamente
  test('Deve criar um novo projeto', () => {
    // Define os dados do projeto que será criado
    const dadosProjeto = {
      nome: 'Projeto Teste',
      descricao: 'Descrição do projeto teste',
      dataInicio: new Date(), // Data atual como data de início
      dataFim: new Date(2024, 11, 31) // Data de fim específica
    };

    // Cria um novo projeto usando o gerenciador
    const projeto = gerenciador.criarProjeto(dadosProjeto);

    // Verifica se o projeto criado possui os mesmos atributos fornecidos
    expect(projeto.nome).toBe(dadosProjeto.nome);
    expect(projeto.descricao).toBe(dadosProjeto.descricao);
    // Verifica se o projeto foi adicionado à lista de projetos do gerenciador
    expect(gerenciador.projetos).toHaveLength(1);
  });

  // Teste para verificar se é possível adicionar uma tarefa a um projeto
  test('Deve adicionar uma tarefa ao projeto', () => {
    // Cria um novo projeto antes de adicionar a tarefa
    const projeto = gerenciador.criarProjeto({
      nome: 'Projeto Teste',
      descricao: 'Projeto para testar adição de tarefa',
      dataInicio: new Date(),
      dataFim: new Date(2024, 11, 31)
    });

    // Define os dados da tarefa
    const dadosTarefa = {
      titulo: 'Tarefa Teste',
      descricao: 'Descrição da tarefa teste',
      prazo: new Date(2024, 6, 1), // Prazo da tarefa
      prioridade: 'alta' // Prioridade da tarefa
    };

    // Adiciona a tarefa ao projeto usando seu ID
    const tarefa = gerenciador.adicionarTarefa(projeto.id, dadosTarefa);

    // Verifica se a tarefa foi adicionada corretamente
    expect(tarefa.titulo).toBe(dadosTarefa.titulo);
    expect(tarefa.prioridade).toBe(dadosTarefa.prioridade);
  });

  // Teste para verificar a geração de um relatório do projeto
  test('Deve gerar relatório do projeto', () => {
    // Cria um novo projeto antes de gerar o relatório
    const projeto = gerenciador.criarProjeto({
      nome: 'Projeto Teste',
      descricao: 'Projeto para testar geração de relatório',
      dataInicio: new Date(),
      dataFim: new Date(2024, 11, 31)
    });

    // Gera um relatório para o projeto criado
    const relatorio = gerenciador.gerarRelatorio(projeto.id);

    // Verifica se o relatório contém as propriedades esperadas
    expect(relatorio).toHaveProperty('projeto');
    expect(relatorio).toHaveProperty('tarefas');
    expect(relatorio).toHaveProperty('estatisticas');
  });

  // Teste para verificar se um erro é lançado ao adicionar tarefa a um projeto inexistente
  test('Deve lançar erro ao tentar adicionar tarefa a projeto inexistente', () => {
    const dadosTarefa = {
      titulo: 'Tarefa Teste',
      descricao: 'Descrição da tarefa teste',
      prazo: new Date(2024, 6, 1),
      prioridade: 'alta'
    };

    // Verifica se a tentativa de adicionar a tarefa a um projeto inexistente lança um erro
    expect(() => gerenciador.adicionarTarefa('inexistente', dadosTarefa))
      .toThrow('Projeto não encontrado');
  });

  // Teste para verificar se um erro é lançado ao gerar relatório de um projeto inexistente
  test('Deve lançar erro ao tentar gerar relatório de projeto inexistente', () => {
    // Verifica se a tentativa de gerar um relatório para um projeto inexistente lança um erro
    expect(() => gerenciador.gerarRelatorio('inexistente'))
      .toThrow('Projeto não encontrado');
  });

  // Teste para verificar se uma tarefa pode ser atribuída a um membro da equipe
  test('Deve atribuir uma tarefa a um membro da equipe', () => {
    // Cria um novo projeto antes de atribuir a tarefa
    const projeto = gerenciador.criarProjeto({
      nome: 'Projeto Teste',
      descricao: 'Projeto para testar atribuição de tarefa',
      dataInicio: new Date(),
      dataFim: new Date(2024, 11, 31)
    });

    // Define os dados da tarefa
    const dadosTarefa = {
      titulo: 'Tarefa Teste',
      descricao: 'Descrição da tarefa teste',
      prazo: new Date(2024, 6, 1),
      prioridade: 'alta'
    };

    // Adiciona a tarefa ao projeto
    const tarefa = gerenciador.adicionarTarefa(projeto.id, dadosTarefa);

    const membroId = 'membro1'; // ID fictício do membro da equipe

    // Atribui a tarefa ao membro
    gerenciador.atribuirTarefa(projeto.id, tarefa.id, membroId);

    // Verifica se a tarefa foi atribuída corretamente ao membro
    expect(tarefa.responsavel).toBe(membroId);
  });

  // Teste para verificar se um erro é lançado ao atribuir uma tarefa a um projeto inexistente
  test('Deve lançar erro ao tentar atribuir tarefa a projeto inexistente', () => {
    const membroId = 'membro1';

    // Verifica se a tentativa de atribuir uma tarefa em um projeto inexistente lança um erro
    expect(() => gerenciador.atribuirTarefa('inexistente', 'tarefaId', membroId))
      .toThrow('Projeto não encontrado');
  });

  // Teste para verificar se um erro é lançado ao atribuir uma tarefa inexistente
  test('Deve lançar erro ao tentar atribuir tarefa inexistente', () => {
    // Cria um novo projeto antes da tentativa de atribuição
    const projeto = gerenciador.criarProjeto({
      nome: 'Projeto Teste',
      descricao: 'Projeto para testar erro de atribuição',
      dataInicio: new Date(),
      dataFim: new Date(2024, 11, 31)
    });

    const membroId = 'membro1';

    // Verifica se a tentativa de atribuir uma tarefa inexistente lança um erro
    expect(() => gerenciador.atribuirTarefa(projeto.id, 'tarefaInexistente', membroId))
      .toThrow('Tarefa não encontrada');
  });
});
