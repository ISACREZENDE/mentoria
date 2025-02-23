// Função para definir uma meta para o usuário.
// Recebe o nome do usuário, tipo de meta (ex: perder peso) e valor alvo.
function definirMeta(usuario, tipoMeta, valorAlvo) {
    return { 
      usuario, 
      tipoMeta, 
      valorAlvo, 
      progressoAtual: 0 // Inicializa o progresso atual como 0.
    }; 
  }
  
  // Função para atualizar o progresso de uma meta existente.
  // Recebe o objeto da meta e o valor a ser adicionado ao progresso.
  function atualizarProgressoMeta(meta, progresso) {
    meta.progressoAtual += progresso; // Incrementa o progresso atual com o valor fornecido.
    return meta; // Retorna a meta atualizada.
  }
  
  module.exports = { definirMeta, atualizarProgressoMeta }; // Exporta ambas as funções.