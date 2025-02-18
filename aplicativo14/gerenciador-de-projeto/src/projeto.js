const { Tarefa } = require('./tarefa'); // Importa a classe Tarefa do arquivo tarefa.js

class Projeto { // Define a classe Projeto
  constructor({ nome, descricao, dataInicio, dataFim }) { // Construtor da classe que inicializa as propriedades do projeto
    this.id = this.gerarId(); // Gera um ID único para o projeto
    this.nome = nome; // Define o nome do projeto
    this.descricao = descricao; // Define a descrição do projeto
    this.dataInicio = dataInicio; // Define a data de início do projeto
    this.dataFim = dataFim; // Define a data de fim do projeto
    this.tarefas = []; // Inicializa um array vazio para armazenar as tarefas do projeto
  }

  gerarId() { // Método para gerar um ID único
    return Math.random().toString(36).substr(2, 9); // Gera um ID aleatório usando caracteres alfanuméricos
  }

  adicionarTarefa(dadosTarefa) { // Método para adicionar uma nova tarefa ao projeto
    const novaTarefa = new Tarefa(dadosTarefa); // Cria uma nova instância da classe Tarefa
    this.tarefas.push(novaTarefa); // Adiciona a nova tarefa ao array de tarefas do projeto
    return novaTarefa; // Retorna a nova tarefa criada
  }

  encontrarTarefa(tarefaId) { // Método para encontrar uma tarefa pelo seu ID
    return this.tarefas.find(t => t.id === tarefaId); // Retorna a tarefa que corresponde ao ID fornecido
  }

  atribuirTarefa(tarefaId, membroId) { // Método para atribuir uma tarefa a um membro da equipe
    const tarefa = this.encontrarTarefa(tarefaId); // Encontra a tarefa pelo ID
    if (!tarefa) { // Se a tarefa não for encontrada
      throw new Error('Tarefa não encontrada'); // Lança um erro
    }
    tarefa.atribuirResponsavel(membroId); // Chama o método atribuirResponsavel da tarefa para atribuir um membro
  }

  calcularProgresso() { // Método para calcular o progresso do projeto
    const totalTarefas = this.tarefas.length; // Obtém o total de tarefas
    const tarefasConcluidas = this.tarefas.filter(t => t.status === 'concluída').length; // Conta as tarefas concluídas
    return totalTarefas > 0 ? (tarefasConcluidas / totalTarefas) * 100 : 0; // Retorna a porcentagem de tarefas concluídas
  }
}

module.exports = { Projeto }; // Exporta a classe Projeto para ser utilizada em outros arquivos