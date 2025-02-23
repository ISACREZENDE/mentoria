// Importa a função 'registrarAtividade' do arquivo 'atividade.js'.
const { registrarAtividade } = require('../src/atividade');

// Teste para registrar uma atividade física.
// Chama a função 'registrarAtividade' com os dados da atividade.
const atividade1 = registrarAtividade("João", "Corrida", 30, 300);

// Exibe a atividade registrada no console para verificar se está correta.
console.log("// Atividade registrada:", atividade1);