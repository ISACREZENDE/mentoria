// Importa a função 'registrarIngestaoCalorica' do arquivo 'nutricao.js'.
const { registrarIngestaoCalorica } = require('../src/nutricao');

// Teste para registrar ingestão calórica.
// Chama a função 'registrarIngestaoCalorica' com os dados de ingestão.
const registroNutricao1 = registrarIngestaoCalorica("João", "2023-10-01", 2000);

// Exibe o registro de nutrição no console para verificar se está correto.
console.log("// Registro de nutrição:", registroNutricao1);