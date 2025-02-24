// Importa a classe GerenciadorTarefas do arquivo renomeado
const GerenciadorTarefas = require('./gerenciadorTarefas');

// Descreve o conjunto de testes para o GerenciadorTarefas
describe('GerenciadorTarefas', () => {
    let gerenciadorTarefas;

    // Antes de cada teste, cria uma nova instância do GerenciadorTarefas
    beforeEach(() => {
        gerenciadorTarefas = new GerenciadorTarefas();
    });

    // Teste: Adicionar uma nova tarefa
    test('deve adicionar uma nova tarefa', () => {
        const tarefa = gerenciadorTarefas.adicionarTarefa('Estudar JavaScript', 'estudos');
        expect(tarefa).toEqual({
            id: 1,
            titulo: 'Estudar JavaScript',
            categoria: 'estudos',
            concluida: false,
            lembrete: null,
        });
    });

    // Teste: Lançar erro ao adicionar tarefa sem título ou categoria
    test('deve lançar erro ao adicionar tarefa sem título ou categoria', () => {
        expect(() => gerenciadorTarefas.adicionarTarefa('', 'estudos')).toThrow('Título e categoria são obrigatórios.');
        expect(() => gerenciadorTarefas.adicionarTarefa('Estudar JavaScript', '')).toThrow('Título e categoria são obrigatórios.');
    });

    // Teste: Marcar uma tarefa como concluída
    test('deve marcar uma tarefa como concluída', () => {
        gerenciadorTarefas.adicionarTarefa('Ler um livro', 'pessoal');
        const tarefaConcluida = gerenciadorTarefas.concluirTarefa(1);
        expect(tarefaConcluida.concluida).toBe(true);
    });

    // Teste: Lançar erro ao marcar tarefa inexistente como concluída
    test('deve lançar erro ao marcar tarefa inexistente como concluída', () => {
        expect(() => gerenciadorTarefas.concluirTarefa(99)).toThrow('Tarefa com ID 99 não encontrada.');
    });

    // Teste: Listar tarefas por categoria
    test('deve listar tarefas por categoria', () => {
        gerenciadorTarefas.adicionarTarefa('Fazer exercícios', 'pessoal');
        gerenciadorTarefas.adicionarTarefa('Reunião com equipe', 'trabalho');
        const tarefasPessoais = gerenciadorTarefas.listarTarefasPorCategoria('pessoal');
        expect(tarefasPessoais.length).toBe(1);
        expect(tarefasPessoais[0].titulo).toBe('Fazer exercícios');
    });

    // Teste: Lançar erro ao listar tarefas sem categoria
    test('deve lançar erro ao listar tarefas sem categoria', () => {
        expect(() => gerenciadorTarefas.listarTarefasPorCategoria('')).toThrow('Categoria é obrigatória.');
    });

    // Teste: Remover uma tarefa
    test('deve remover uma tarefa', () => {
        gerenciadorTarefas.adicionarTarefa('Comprar pão', 'pessoal');
        gerenciadorTarefas.removerTarefa(1);
        const tarefas = gerenciadorTarefas.listarTarefas();
        expect(tarefas.length).toBe(0);
    });

    // Teste: Lançar erro ao remover tarefa inexistente
    test('deve lançar erro ao remover tarefa inexistente', () => {
        expect(() => gerenciadorTarefas.removerTarefa(99)).toThrow('Tarefa com ID 99 não encontrada.');
    });
});