// Função para criar um plano de treino personalizado.
// Recebe o nome do plano e uma lista de exercícios como parâmetros.
function criarPlanoTreino(nomePlano, exercicios) {
    return { nome: nomePlano, exercicios }; // Retorna um objeto com o nome do plano e os exercícios.
  }
  
  module.exports = { criarPlanoTreino }; // Exporta a função para ser usada em outros arquivos.