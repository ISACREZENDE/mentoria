// Importa a função 'criarUsuario' do arquivo 'usuario.js'.
const { criarUsuario } = require('../src/usuario');

// Teste para criar um usuário.
// Chama a função 'criarUsuario' com os dados do usuário.
const usuario1 = criarUsuario("João", 25, 70, 175); 

// Exibe o usuário criado no console para verificar se está correto.
console.log("// Usuário criado:", usuario1);