const { Projeto } = require('./projeto'); // Importa a classe Projeto do arquivo projeto.js
const { Tarefa } = require('./tarefa'); // Importa a classe Tarefa do arquivo tarefa.js

class GeradorRelatorios { // Define a classe GeradorRelatorios
  gerarRelatorioStatus(projeto) { // Método para gerar um relatório de status do projeto
    const total = projeto.tarefas.length; // Obtém o total de tarefas do projeto
    const concluidas = projeto.tarefas.filter(t => t.status === 'concluída').length; // Conta as tarefas concluídas
    const emAndamento = projeto.tarefas.filter(t => t.status === 'em_andamento').length; // Conta as tarefas em andamento
    const pendentes = projeto.tarefas.filter(t => t.status === 'pendente').length; // Conta as tarefas pendentes

    return { // Retorna um objeto com as informações do relatório
      projeto: { // Informações do projeto
        nome: projeto.nome, // Nome do projeto
        progresso: projeto.calcularProgresso(), // Chama o método calcularProgresso do projeto para obter o progresso
        dataInicio: projeto.dataInicio, // Data de início do projeto
        dataFim: projeto.dataFim // Data de fim do projeto
      },
      tarefas: this.gerarResumoTarefas(projeto.tarefas), // Chama o método gerarResumoTarefas para obter um resumo das tarefas
      estatisticas: { // Estatísticas do projeto
        total, // Total de tarefas
        concluidas, // Total de tarefas concluídas
        emAndamento, // Total de tarefas em andamento
        pendentes, // Total de tarefas pendentes
        percentualConcluido: total > 0 ? (concluidas / total) * 100 : 0 // Calcula o percentual de tarefas concluídas
      }
    };
  }

  gerarResumoTarefas(tarefas) { // Método para gerar um resumo das tarefas
    return tarefas.map(tarefa => ({ // Mapeia cada tarefa para um novo objeto com as informações relevantes
      titulo: tarefa.titulo, // Título da tarefa
      status: tarefa.status, // Status da tarefa
      prazo: tarefa.prazo, // Prazo da tarefa
      prioridade: tarefa.prioridade, // Prioridade da tarefa
      responsavel: tarefa.responsavel || 'Não atribuído' // Responsável da tarefa ou 'Não atribuído' se não houver
    }));
  }
}

module.exports = { GeradorRelatorios }; // Exporta a classe GeradorRelatorios para ser utilizada em outros arquivos
