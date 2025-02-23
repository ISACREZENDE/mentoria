// Função para registrar uma atividade física realizada pelo usuário.
// Recebe o nome do usuário, descrição da atividade, duração e calorias queimadas.
function registrarAtividade(usuario, descricao, duracao, caloriasQueimadas) {
    return { usuario, descricao, duracao, caloriasQueimadas }; // Retorna um objeto com os dados da atividade.
  }
  
  module.exports = { registrarAtividade }; // Exporta a função para ser usada em outros arquivos.