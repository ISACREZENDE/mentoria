// Função para registrar a ingestão calórica diária de um usuário.
// Recebe o nome do usuário, data e quantidade de calorias consumidas.
function registrarIngestaoCalorica(usuario, data, calorias) {
    return { usuario, data, calorias }; // Retorna um objeto com os dados de ingestão calórica.
  }
  
  module.exports = { registrarIngestaoCalorica }; // Exporta a função para ser usada em outros arquivos.