const { Projeto } = require('./projeto'); // Importa a classe Projeto do arquivo projeto.js
const { Tarefa } = require('./tarefa'); // Importa a classe Tarefa do arquivo tarefa.js
const { GeradorRelatorios } = require('./geradorRelatorios'); // Importa a classe GeradorRelatorios do arquivo geradorRelatorios.js

class GerenciadorProjetos { // Define a classe GerenciadorProjetos
  constructor() { // Construtor da classe
    this.projetos = []; // Inicializa um array vazio para armazenar os projetos
    this.geradorRelatorios = new GeradorRelatorios(); // Cria uma nova instância da classe GeradorRelatorios
  }

  criarProjeto(dadosProjeto) { // Método para criar um novo projeto
    const novoProjeto = new Projeto(dadosProjeto); // Cria uma nova instância da classe Projeto com os dados fornecidos
    this.projetos.push(novoProjeto); // Adiciona o novo projeto ao array de projetos
    return novoProjeto; // Retorna o novo projeto criado
  }

  adicionarTarefa(projetoId, dadosTarefa) { // Método para adicionar uma tarefa a um projeto específico
    const projeto = this.encontrarProjeto(projetoId); // Encontra o projeto pelo ID
    if (!projeto) { // Se o projeto não for encontrado
      throw new Error('Projeto não encontrado'); // Lança um erro
    }
    return projeto.adicionarTarefa(dadosTarefa); // Chama o método adicionarTarefa do projeto e retorna a nova tarefa
  }

  atribuirTarefa(projetoId, tarefaId, membroId) { // Método para atribuir uma tarefa a um membro da equipe
    const projeto = this.encontrarProjeto(projetoId); // Encontra o projeto pelo ID
    if (!projeto) { // Se o projeto não for encontrado
      throw new Error('Projeto não encontrado'); // Lança um erro
    }
    projeto.atribuirTarefa(tarefaId, membroId); // Chama o método atribuirTarefa do projeto
  }

  gerarRelatorio(projetoId) { // Método para gerar um relatório de um projeto específico
    const projeto = this.encontrarProjeto(projetoId); // Encontra o projeto pelo ID
    if (!projeto) { // Se o projeto não for encontrado
      throw new Error('Projeto não encontrado'); // Lança um erro
    }
    return this.geradorRelatorios.gerarRelatorioStatus(projeto); // Chama o método gerarRelatorioStatus da classe GeradorRelatorios
  }

  encontrarProjeto(projetoId) { // Método para encontrar um projeto pelo seu ID
    return this.projetos.find(p => p.id === projetoId); // Retorna o projeto que corresponde ao ID fornecido
  }
}

module.exports = { GerenciadorProjetos }; // Exporta a classe GerenciadorProjetos para ser utilizada em outros arquivos