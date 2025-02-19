// sala.js

// Define a classe Sala
class Sala {
  // Construtor da classe Sala
  constructor(nome) {
      // Define o nome da sala
      this.nome = nome;
      // Cria um novo Set para armazenar os usuários da sala
      // Sets garantem que cada usuário seja armazenado apenas uma vez
      this.usuarios = new Set();
      // Cria um array para armazenar as mensagens da sala
      this.mensagens = [];
  }

  // Método para adicionar um usuário à sala
  adicionarUsuario(usuario) {
      // Adiciona o usuário ao Set de usuários
      this.usuarios.add(usuario);
  }

  // Método para remover um usuário da sala
  removerUsuario(usuario) {
      // Remove o usuário do Set de usuários
      this.usuarios.delete(usuario);
  }

  // Método para enviar uma mensagem para a sala
  enviarMensagem(mensagem) {
      // Adiciona a mensagem ao array de mensagens
      this.mensagens.push(mensagem);
  }

  // Método para obter o histórico de mensagens da sala
  obterHistoricoMensagens() {
      // Retorna o array de mensagens
      return this.mensagens;
  }
}

// Exporta a classe Sala para que possa ser utilizada em outros módulos
module.exports = Sala;