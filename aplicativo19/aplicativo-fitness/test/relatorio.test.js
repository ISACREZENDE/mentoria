// Importa as funções necessárias para gerar o relatório.
const { gerarRelatorioProgresso } = require('../src/relatorio');
const { registrarAtividade } = require('../src/atividade');
const { definirMeta, atualizarProgressoMeta } = require('../src/meta');

// Dados de teste para o relatório.
const usuario1 = "João";

// Registra duas atividades físicas.
const atividades = [
  registrarAtividade(usuario1, "Corrida", 30, 300),
  registrarAtividade(usuario1, "Musculação", 60, 500),
];

// Define e atualiza uma meta.
const meta1 = definirMeta(usuario1, "Perder Peso", 5);
atualizarProgressoMeta(meta1, 2); // Atualiza o progresso em 2 kg.

// Gera o relatório de progresso.
const relatorio = gerarRelatorioProgresso(usuario1, atividades, meta1);

// Exibe o relatório no console para verificar se está correto.
console.log("// Relatório de progresso:", relatorio);