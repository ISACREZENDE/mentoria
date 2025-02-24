// Importa a classe GerenciadorTarefas do arquivo renomeado
const GerenciadorTarefas = require('./gerenciadorTarefas');
const gerenciadorTarefas = new GerenciadorTarefas();

// Adiciona tarefas
gerenciadorTarefas.adicionarTarefa('Estudar JavaScript', 'estudos');
gerenciadorTarefas.adicionarTarefa('Fazer exercícios', 'pessoal');

// Marca uma tarefa como concluída
gerenciadorTarefas.concluirTarefa(1);

// Lista todas as tarefas
console.log('Todas as tarefas:', gerenciadorTarefas.listarTarefas());

// Lista tarefas da categoria 'pessoal'
console.log('Tarefas pessoais:', gerenciadorTarefas.listarTarefasPorCategoria('pessoal'));

// Remove uma tarefa
gerenciadorTarefas.removerTarefa(2);

// Lista tarefas após remoção
console.log('Tarefas após remoção:', gerenciadorTarefas.listarTarefas());