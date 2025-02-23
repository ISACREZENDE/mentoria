// Importa a função 'criarPlanoTreino' do arquivo 'planoTreino.js'.
const { criarPlanoTreino } = require('../src/planoTreino');

// Teste para criar um plano de treino.
// Chama a função 'criarPlanoTreino' com o nome do plano e uma lista de exercícios.
const planoTreino1 = criarPlanoTreino("Plano de Força", ["Supino", "Agachamento"]);

// Exibe o plano de treino criado no console para verificar se está correto.
console.log("// Plano de treino criado:", planoTreino1);