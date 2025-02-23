// Função para criar um novo usuário.
// Recebe nome, idade, peso e altura como parâmetros e retorna um objeto representando o usuário.
function criarUsuario(nome, idade, peso, altura) {
    return { nome, idade, peso, altura }; // Retorna um objeto com as propriedades do usuário.
  }
  
  module.exports = { criarUsuario }; // Exporta a função para ser usada em outros arquivos.