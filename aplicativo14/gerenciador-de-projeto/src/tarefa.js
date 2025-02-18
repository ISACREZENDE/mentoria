class Tarefa { // Define a classe Tarefa
  constructor({ titulo, descricao, prazo, prioridade }) { // Construtor da classe que inicializa as propriedades da tarefa
    this.id = this.gerarId(); // Gera um ID único para a tarefa
    this.titulo = titulo; // Define o título da tarefa
    this.descricao = descricao; // Define a descrição da tarefa
    this.prazo = prazo; // Define o prazo da tarefa
    this.prioridade = prioridade; // Define a prioridade da tarefa
    this.status = 'pendente'; // Define o status inicial da tarefa como 'pendente'
    this.progresso = 0; // Inicializa o progresso da tarefa como 0
    this.responsavel = null; // Inicializa o responsável da tarefa como nulo
  }

  gerarId() { // Método para gerar um ID único
    return Math.random().toString(36).substr(2, 9); // Gera um ID aleatório usando caracteres alfanuméricos
  }

  atualizarProgresso(novoProgresso) { // Método para atualizar o progresso da tarefa
    this.progresso = novoProgresso; // Atualiza o progresso da tarefa
    this.status = novoProgresso === 100 ? 'concluída' : 'em_andamento'; // Atualiza o status com base no progresso
  }

  atribuirResponsavel(membroId) { // Método para atribuir um responsável à tarefa
    this.responsavel = membroId; // Define o responsável da tarefa
  }
}

module.exports = { Tarefa }; // Exporta a classe Tarefa para ser utilizada em outros arquivos
