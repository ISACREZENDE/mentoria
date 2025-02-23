// Importa o módulo 'readline' para criar uma interface de linha de comando.
const readline = require('readline');

// Importa as funções necessárias do projeto.
const { criarUsuario } = require('./src/usuario'); // Função para criar um usuário.
const { criarPlanoTreino } = require('./src/planoTreino'); // Função para criar um plano de treino.
const { registrarAtividade } = require('./src/atividade'); // Função para registrar uma atividade física.
const { definirMeta, atualizarProgressoMeta } = require('./src/meta'); // Funções para definir e atualizar metas.
const { registrarIngestaoCalorica } = require('./src/nutricao'); // Função para registrar ingestão calórica.
const { gerarRelatorioProgresso } = require('./src/relatorio'); // Função para gerar relatórios de progresso.

// Cria uma interface de leitura e escrita no terminal.
const rl = readline.createInterface({
  input: process.stdin, // Define a entrada padrão (teclado).
  output: process.stdout, // Define a saída padrão (terminal).
});

// Função para perguntar algo ao usuário e retornar uma Promise.
function perguntar(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, (resposta) => {
      resolve(resposta.trim()); // Remove espaços extras da resposta e resolve a Promise.
    });
  });
}

// Função principal para interação com o usuário.
async function iniciarInterface() {
  console.log("=== Bem-vindo ao Aplicativo de Treinamento e Fitness ==="); // Mensagem de boas-vindas.

  // Pergunta ao usuário se deseja criar um novo perfil ou continuar.
  const opcao = await perguntar("Deseja criar um novo perfil? (s/n): "); // Pergunta se o usuário quer criar um perfil.
  if (opcao.toLowerCase() === "s") { // Verifica se a resposta foi "s" (sim).
    const nome = await perguntar("Digite seu nome: "); // Pede o nome do usuário.
    const idade = parseInt(await perguntar("Digite sua idade: "), 10); // Pede a idade e converte para número inteiro.
    const peso = parseFloat(await perguntar("Digite seu peso (kg): ")); // Pede o peso e converte para número decimal.
    const altura = parseFloat(await perguntar("Digite sua altura (cm): ")); // Pede a altura e converte para número decimal.

    // Cria o usuário usando a função importada.
    const usuario = criarUsuario(nome, idade, peso, altura);
    console.log(`Usuário criado: ${JSON.stringify(usuario, null, 2)}`); // Exibe o usuário criado no formato JSON.
  }

  // Menu principal.
  let continuar = true; // Variável para controlar o loop do menu.
  while (continuar) { // Loop que mantém o menu ativo até o usuário escolher sair.
    console.log("\n=== Menu Principal ==="); // Título do menu principal.
    console.log("1. Criar Plano de Treino"); // Opção para criar um plano de treino.
    console.log("2. Registrar Atividade Física"); // Opção para registrar uma atividade física.
    console.log("3. Definir Meta"); // Opção para definir uma meta.
    console.log("4. Registrar Ingestão Calórica"); // Opção para registrar ingestão calórica.
    console.log("5. Gerar Relatório de Progresso"); // Opção para gerar um relatório de progresso.
    console.log("6. Sair"); // Opção para sair do aplicativo.

    const escolha = await perguntar("Escolha uma opção (1-6): "); // Pergunta ao usuário qual opção deseja escolher.

    switch (escolha) { // Estrutura de controle para lidar com as opções do menu.
      case "1":
        // Criar Plano de Treino
        const nomePlano = await perguntar("Digite o nome do plano de treino: "); // Pede o nome do plano de treino.
        const exercicios = (await perguntar("Digite os exercícios separados por vírgula: ")).split(","); // Pede os exercícios e divide em um array.
        const planoTreino = criarPlanoTreino(nomePlano, exercicios.map((ex) => ex.trim())); // Cria o plano de treino.
        console.log(`Plano de treino criado: ${JSON.stringify(planoTreino, null, 2)}`); // Exibe o plano de treino no formato JSON.
        break;

      case "2":
        // Registrar Atividade Física
        const descricao = await perguntar("Digite a descrição da atividade: "); // Pede a descrição da atividade.
        const duracao = parseInt(await perguntar("Digite a duração (minutos): "), 10); // Pede a duração e converte para número inteiro.
        const caloriasQueimadas = parseFloat(await perguntar("Digite as calorias queimadas: ")); // Pede as calorias queimadas e converte para número decimal.
        const atividade = registrarAtividade("João", descricao, duracao, caloriasQueimadas); // Registra a atividade.
        console.log(`Atividade registrada: ${JSON.stringify(atividade, null, 2)}`); // Exibe a atividade no formato JSON.
        break;

      case "3":
        // Definir Meta
        const tipoMeta = await perguntar("Digite o tipo de meta (ex: Perder Peso): "); // Pede o tipo de meta.
        const valorAlvo = parseFloat(await perguntar("Digite o valor alvo: ")); // Pede o valor alvo e converte para número decimal.
        const meta = definirMeta("João", tipoMeta, valorAlvo); // Define a meta.
        console.log(`Meta definida: ${JSON.stringify(meta, null, 2)}`); // Exibe a meta no formato JSON.
        break;

      case "4":
        // Registrar Ingestão Calórica
        const data = await perguntar("Digite a data (AAAA-MM-DD): "); // Pede a data.
        const calorias = parseFloat(await perguntar("Digite a quantidade de calorias consumidas: ")); // Pede as calorias e converte para número decimal.
        const registroNutricao = registrarIngestaoCalorica("João", data, calorias); // Registra a ingestão calórica.
        console.log(`Registro de nutrição: ${JSON.stringify(registroNutricao, null, 2)}`); // Exibe o registro no formato JSON.
        break;

      case "5":
        // Gerar Relatório de Progresso
        const atividades = [
          registrarAtividade("João", "Corrida", 30, 300), // Registra uma atividade fictícia.
          registrarAtividade("João", "Musculação", 60, 500), // Registra outra atividade fictícia.
        ];
        const metaRelatorio = definirMeta("João", "Perder Peso", 5); // Define uma meta fictícia.
        atualizarProgressoMeta(metaRelatorio, 2); // Atualiza o progresso da meta fictícia.
        const relatorio = gerarRelatorioProgresso("João", atividades, metaRelatorio); // Gera o relatório de progresso.
        console.log(`Relatório de progresso: ${JSON.stringify(relatorio, null, 2)}`); // Exibe o relatório no formato JSON.
        break;

      case "6":
        // Sair
        continuar = false; // Define a variável 'continuar' como false para sair do loop.
        console.log("Saindo do aplicativo. Até logo!"); // Mensagem de despedida.
        break;

      default:
        console.log("Opção inválida. Tente novamente."); // Mensagem para opções inválidas.
    }
  }

  // Fecha a interface de leitura.
  rl.close(); // Encerra a interface de linha de comando.
}

// Inicia a interface.
iniciarInterface(); // Chama a função principal para iniciar a interação com o usuário.