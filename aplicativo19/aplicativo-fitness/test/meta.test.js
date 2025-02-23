// Importa as funções 'definirMeta' e 'atualizarProgressoMeta' do arquivo 'meta.js'.
const { definirMeta, atualizarProgressoMeta } = require('../src/meta');

// Teste para definir uma meta.
// Chama a função 'definirMeta' com os dados da meta.
const meta1 = definirMeta("João", "Perder Peso", 5); // Meta: Perder 5 kg.

// Exibe a meta definida no console para verificar se está correta.
console.log("// Meta definida:", meta1);

// Teste para atualizar o progresso da meta.
// Chama a função 'atualizarProgressoMeta' com a meta e o progresso a ser adicionado.
const metaAtualizada = atualizarProgressoMeta(meta1, 2); // Atualiza o progresso em 2 kg.

// Exibe a meta atualizada no console para verificar se está correta.
console.log("// Meta atualizada:", metaAtualizada);