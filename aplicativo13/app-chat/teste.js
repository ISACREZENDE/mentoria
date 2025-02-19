// teste.js

// Importa a classe GerenciadorSalas do arquivo gerenciador_salas.js
const GerenciadorSalas = require('./gerenciador_salas');
// Importa a classe Usuario do arquivo usuario.js
const Usuario = require('./usuario');

// Cria uma nova instância do GerenciadorSalas
const gerenciador = new GerenciadorSalas();
// Cria dois novos usuários
const usuario1 = new Usuario(1, "João");
const usuario2 = new Usuario(2, "Maria");

// Cria uma nova sala chamada "sala1"
gerenciador.criarSala("sala1");
// O usuário1 entra na sala "sala1"
gerenciador.entrarNaSala("sala1", usuario1);
// O usuário2 entra na sala "sala1"
gerenciador.entrarNaSala("sala1", usuario2);

// Define o usuário1 como online
gerenciador.definirUsuarioOnline(usuario1);
// Define o usuário2 como offline
gerenciador.definirUsuarioOffline(usuario2);

// Exibe no console os usuários online
console.log(gerenciador.obterUsuariosOnline());

// O usuário1 sai da sala "sala1"
gerenciador.sairDaSala("sala1", usuario1);

// Exibe no console os usuários online após a saída do usuário1
console.log(gerenciador.obterUsuariosOnline());