const TaskManager = require('./taskManager');

const taskManager = new TaskManager();

// Adiciona tarefas
taskManager.addTask('Estudar JavaScript', 'estudos');
taskManager.addTask('Fazer exercícios', 'pessoal');

// Marca uma tarefa como concluída
taskManager.completeTask(1);

// Lista todas as tarefas
console.log('Todas as tarefas:', taskManager.getTasks());

// Lista tarefas da categoria 'pessoal'
console.log('Tarefas pessoais:', taskManager.getTasksByCategory('pessoal'));

// Remove uma tarefa
taskManager.removeTask(2);
console.log('Tarefas após remoção:', taskManager.getTasks());
