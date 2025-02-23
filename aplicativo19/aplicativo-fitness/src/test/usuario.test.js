const { criarUsuario } = require('../src/usuario');

// Teste para criar um usuário
const usuario1 = criarUsuario("João", 25, 70, 175);
console.log("// Usuário criado:", usuario1);
