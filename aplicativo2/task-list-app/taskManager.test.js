// Importa a classe TaskManager
const TaskManager = require('./taskManager');

// Descreve o conjunto de testes para o TaskManager
describe('TaskManager', () => {
  let taskManager;

  // Antes de cada teste, cria uma nova instância do TaskManager
  beforeEach(() => {
    taskManager = new TaskManager();
  });

  // Teste: Adicionar uma nova tarefa
  test('deve adicionar uma nova tarefa', () => {
    const task = taskManager.addTask('Estudar JavaScript', 'estudos');
    expect(task).toEqual({
      id: 1,
      title: 'Estudar JavaScript',
      category: 'estudos',
      completed: false,
      reminder: null,
    });
  });

  // Teste: Marcar uma tarefa como concluída
  test('deve marcar uma tarefa como concluída', () => {
    taskManager.addTask('Ler um livro', 'pessoal');
    const completedTask = taskManager.completeTask(1);
    expect(completedTask.completed).toBe(true);
  });

  // Teste: Listar tarefas por categoria
  test('deve listar tarefas por categoria', () => {
    taskManager.addTask('Fazer exercícios', 'pessoal');
    taskManager.addTask('Reunião com equipe', 'trabalho');
    const personalTasks = taskManager.getTasksByCategory('pessoal');
    expect(personalTasks.length).toBe(1);
    expect(personalTasks[0].title).toBe('Fazer exercícios');
  });

  // Teste: Remover uma tarefa
  test('deve remover uma tarefa', () => {
    taskManager.addTask('Comprar pão', 'pessoal');
    taskManager.removeTask(1);
    const tasks = taskManager.getTasks();
    expect(tasks.length).toBe(0);
  });
});