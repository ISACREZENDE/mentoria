const { Projeto } = require('./projeto');
const { Tarefa } = require('./tarefa');
const { GeradorRelatorios } = require('./geradorRelatorios');

class GerenciadorProjetos {
  constructor() {
    // Lista para armazenar todos os projetos
    this.projetos = [];
    // Instância do gerador de relatórios
    this.geradorRelatorios = new GeradorRelatorios();
  }

  // Método para criar um novo projeto
  criarProjeto(dadosProjeto) {
    const novoProjeto = new Projeto(dadosProjeto);
    this.projetos.push(novoProjeto);
    return novoProjeto;
  }

  // Método para adicionar uma tarefa a um projeto
  adicionarTarefa(projetoId, dadosTarefa) {
    const projeto = this.encontrarProjeto(projetoId);
    if (projeto) {
      return projeto.adicionarTarefa(dadosTarefa);
    }
    throw new Error('Projeto não encontrado');
  }

  // Método para atribuir uma tarefa a um membro da equipe
  atribuirTarefa(projetoId, tarefaId, membroId) {
    const projeto = this.encontrarProjeto(projetoId);
    if (projeto) {
      projeto.atribuirTarefa(tarefaId, membroId);
    }
  }

  // Método para atualizar o progresso de uma tarefa
  atualizarProgressoTarefa(projetoId, tarefaId, progresso) {
    const projeto = this.encontrarProjeto(projetoId);
    if (projeto) {
      projeto.atualizarProgressoTarefa(tarefaId, progresso);
    }
  }

  // Método para gerar relatório de status do projeto
  gerarRelatorio(projetoId) {
    const projeto = this.encontrarProjeto(projetoId);
    if (projeto) {
      return this.geradorRelatorios.gerarRelatorioStatus(projeto);
    }
    throw new Error('Projeto não encontrado');
  }

  // Método auxiliar para encontrar um projeto pelo ID
  encontrarProjeto(projetoId) {
    return this.projetos.find(p => p.id === projetoId);
  }
}

module.exports = { GerenciadorProjetos };