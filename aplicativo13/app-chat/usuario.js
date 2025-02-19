// usuario.js

// Define a classe Usuario
class Usuario {
  // Construtor da classe Usuario
  constructor(id, nome) {
      // Define o ID do usuário
      this.id = id;
      // Define o nome do usuário
      this.nome = nome;
      // Define o status online do usuário como false por padrão
      this.online = false;
  }
}

// Exporta a classe Usuario para que possa ser utilizada em outros módulos
module.exports = Usuario;