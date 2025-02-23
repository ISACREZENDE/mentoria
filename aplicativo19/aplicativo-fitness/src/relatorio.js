// Função para gerar um relatório de progresso do usuário.
// Recebe o nome do usuário, uma lista de atividades registradas e a meta atual.
function gerarRelatorioProgresso(usuario, atividades, meta) {
    // Calcula o total de calorias queimadas somando as calorias de todas as atividades.
    const totalCaloriasQueimadas = atividades.reduce((total, a) => total + a.caloriasQueimadas, 0);
  
    // Cria o relatório com o nome do usuário, total de calorias queimadas e status da meta.
    return {
      usuario,
      totalCaloriasQueimadas,
      metaAtual: meta 
        ? `${meta.tipoMeta} - Progresso: ${meta.progressoAtual}/${meta.valorAlvo}` // Se houver meta, exibe o progresso.
        : "Nenhuma meta definida", // Caso contrário, informa que não há meta.
    };
  }
  
  module.exports = { gerarRelatorioProgresso }; // Exporta a função para ser usada em outros arquivos.