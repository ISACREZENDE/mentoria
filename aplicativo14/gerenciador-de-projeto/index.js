// Importação das classes principais
const { GerenciadorProjetos } = require('./src/gerenciadorProjetos');
const { IntegradorComunicacao } = require('./src/integradorComunicacao');

// Criação de uma instância do gerenciador de projetos
const gerenciador = new GerenciadorProjetos();

// Exemplo de uso do sistema
const projeto = gerenciador.criarProjeto({
  nome: 'Projeto Exemplo',
  descricao: 'Um projeto de demonstração',
  dataInicio: new Date(),
  dataFim: new Date(2024, 11, 31)
});

console.log('Sistema de Gerenciamento de Projetos iniciado com sucesso!');