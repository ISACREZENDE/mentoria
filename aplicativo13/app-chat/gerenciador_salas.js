// gerenciador_salas.js

// Importa a classe Sala do arquivo sala.js
const Sala = require('./sala');

// Define a classe GerenciadorSalas
class GerenciadorSalas {
    // Construtor da classe GerenciadorSalas
    constructor() {
        // Cria um novo Map para armazenar as salas
        // A chave é o nome da sala e o valor é o objeto Sala
        this.salas = new Map();
        // Cria um novo Map para armazenar os usuários
        // A chave é o ID do usuário e o valor é o objeto usuário
        this.usuarios = new Map();
    }

    // Método para criar uma nova sala
    criarSala(nomeSala) {
        // Verifica se a sala já existe
        if (this.salas.has(nomeSala)) {
            // Lança um erro se a sala já existir
            throw new Error("Sala já existe.");
        }
        // Cria uma nova sala
        const sala = new Sala(nomeSala);
        // Adiciona a sala ao Map de salas
        this.salas.set(nomeSala, sala);
        // Retorna a sala criada
        return sala;
    }

    // Método para um usuário entrar em uma sala
    entrarNaSala(nomeSala, usuario) {
        // Obtém a sala pelo nome
        const sala = this.salas.get(nomeSala);
        // Verifica se a sala existe
        if (!sala) {
            // Lança um erro se a sala não for encontrada
            throw new Error("Sala não encontrada.");
        }
        // Adiciona o usuário à sala
        sala.adicionarUsuario(usuario);
        // Adiciona o usuário ao Map de usuários
        this.usuarios.set(usuario.id, usuario);
    }

    // Método para um usuário sair de uma sala
    sairDaSala(nomeSala, usuario) {
        // Obtém a sala pelo nome
        const sala = this.salas.get(nomeSala);
        // Verifica se a sala existe
        if (!sala) {
            // Lança um erro se a sala não for encontrada
            throw new Error("Sala não encontrada.");
        }
        // Remove o usuário da sala
        sala.removerUsuario(usuario);
        // Remove o usuário do Map de usuários
        this.usuarios.delete(usuario.id);
    }

    // Método para obter uma sala pelo nome
    obterSala(nomeSala) {
        // Retorna a sala ou undefined se não encontrada
        return this.salas.get(nomeSala);
    }

    // Método para definir um usuário como online
    definirUsuarioOnline(usuario) {
        // Define a propriedade online do usuário como true
        usuario.online = true;
    }

    // Método para definir um usuário como offline
    definirUsuarioOffline(usuario) {
        // Define a propriedade online do usuário como false
        usuario.online = false;
    }

    // Método para obter todos os usuários online
    obterUsuariosOnline() {
        // Converte os valores do Map de usuários em um array
        // Filtra o array para manter apenas os usuários online
        return Array.from(this.usuarios.values()).filter(usuario => usuario.online);
    }
}

// Exporta a classe GerenciadorSalas para que possa ser utilizada em outros módulos
module.exports = GerenciadorSalas;