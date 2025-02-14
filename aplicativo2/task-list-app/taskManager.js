// Classe principal que gerencia as tarefas
class TaskManager {
    constructor() {
      // Inicializa uma lista vazia de tarefas
      this.tasks = [];
    }
  
    // Método para adicionar uma nova tarefa
    addTask(title, category, reminder = null) {
      const task = {
        id: this.tasks.length + 1, // Gera um ID único para a tarefa
        title, // Título da tarefa
        category, // Categoria da tarefa (ex: trabalho, pessoal, estudos)
        completed: false, // Tarefa começa como não concluída
        reminder, // Lembrete (opcional)
      };
      this.tasks.push(task); // Adiciona a tarefa à lista
      return task; // Retorna a tarefa criada
    }
  
    // Método para marcar uma tarefa como concluída
    completeTask(taskId) {
      const task = this.tasks.find((t) => t.id === taskId); // Encontra a tarefa pelo ID
      if (task) {
        task.completed = true; // Marca como concluída
        return task;
      }
      return null; // Retorna null se a tarefa não for encontrada
    }
  
    // Método para listar todas as tarefas
    getTasks() {
      return this.tasks;
    }
  
    // Método para listar tarefas por categoria
    getTasksByCategory(category) {
      return this.tasks.filter((task) => task.category === category);
    }
  
    // Método para remover uma tarefa
    removeTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId); // Filtra e remove a tarefa
    }
  }
  
  // Exporta a classe para ser usada em outros arquivos
  module.exports = TaskManager;