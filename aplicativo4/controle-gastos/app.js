
// Importa o módulo 'readline-sync' para permitir a leitura de entradas do usuário no terminal
const readline = require('readline-sync');

// Importa o módulo 'fs' (file system) para trabalhar com arquivos, como salvar e carregar dados
const fs = require('fs');

// Array para armazenar os gastos registrados pelo usuário
let gastos = [];

// Função para carregar gastos salvos anteriormente em um arquivo JSON
function carregarGastos() {
    // Verifica se o arquivo 'gastos.json' existe no diretório atual
    if (fs.existsSync('gastos.json')) {
        // Lê o conteúdo do arquivo 'gastos.json' como uma string UTF-8
        const dados = fs.readFileSync('gastos.json', 'utf8');
        // Converte o conteúdo JSON (string) de volta para um array JavaScript
        gastos = JSON.parse(dados);
    }
}

// Função para salvar os gastos atuais no arquivo 'gastos.json'
function salvarGastos() {
    // Escreve o array 'gastos' no arquivo 'gastos.json' como uma string JSON formatada
    fs.writeFileSync('gastos.json', JSON.stringify(gastos, null, 2));
}

// Função para registrar um novo gasto
function registrarGasto(valor, categoria, data) {
    // Cria um objeto representando o gasto com as propriedades 'valor', 'categoria' e 'data'
    const gasto = { valor, categoria, data };
    // Adiciona o novo gasto ao array 'gastos'
    gastos.push(gasto);
    // Salva os gastos atualizados no arquivo 'gastos.json'
    salvarGastos();
    // Exibe uma mensagem informando que o gasto foi registrado com sucesso
    console.log('Gasto registrado com sucesso!\n');
}

// Função para visualizar gastos filtrados por uma categoria específica
function visualizarGastosPorCategoria(categoria) {
    // Filtra os gastos que pertencem à categoria especificada
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria === categoria);

    // Verifica se há gastos na categoria selecionada
    if (gastosFiltrados.length > 0) {
        // Exibe o título da lista de gastos para a categoria
        console.log(`Gastos na categoria "${categoria}":`);
        let total = 0; // Variável para calcular o total gasto na categoria

        // Itera sobre os gastos filtrados e exibe cada um deles
        gastosFiltrados.forEach(gasto => {
            console.log(`- Valor: R$ ${gasto.valor.toFixed(2)}, Data: ${gasto.data}`);
            total += gasto.valor; // Soma o valor do gasto ao total
        });

        // Exibe o total gasto na categoria
        console.log(`Total gasto na categoria "${categoria}": R$ ${total.toFixed(2)}\n`);
    } else {
        // Se não houver gastos na categoria, exibe uma mensagem informando isso
        console.log(`Nenhum gasto encontrado na categoria "${categoria}".\n`);
    }
}

// Função para visualizar um resumo geral de todos os gastos, agrupados por categoria
function visualizarResumoGeral() {
    // Verifica se há gastos registrados
    if (gastos.length === 0) {
        // Se não houver gastos, exibe uma mensagem informando isso
        console.log('Nenhum gasto registrado.\n');
        return;
    }

    // Cria um objeto para armazenar o resumo dos gastos por categoria
    const resumo = {};

    // Itera sobre todos os gastos registrados
    gastos.forEach(gasto => {
        // Verifica se a categoria já existe no objeto 'resumo'
        if (!resumo[gasto.categoria]) {
            // Se não existir, inicializa a categoria com valor zero
            resumo[gasto.categoria] = 0;
        }
        // Soma o valor do gasto ao total da categoria correspondente
        resumo[gasto.categoria] += gasto.valor;
    });

    // Exibe o título do resumo geral de gastos
    console.log('Resumo geral de gastos:');
    // Itera sobre as categorias e seus totais no objeto 'resumo'
    for (const [categoria, total] of Object.entries(resumo)) {
        // Exibe o total gasto em cada categoria
        console.log(`- Categoria: ${categoria}, Total: R$ ${total.toFixed(2)}`);
    }
    console.log('\n'); // Pula uma linha para melhorar a formatação
}

// Função principal do aplicativo, responsável pela interação com o usuário
function main() {
    // Exibe uma mensagem de boas-vindas ao iniciar o programa
    console.log('Bem-vindo ao Controle de Gastos!\n');

    // Carrega os gastos salvos anteriormente (se existirem)
    carregarGastos();

    // Loop infinito para manter o programa em execução até que o usuário escolha sair
    while (true) {
        // Exibe o menu de opções para o usuário
        console.log('Escolha uma opção:');
        console.log('1. Registrar um gasto');
        console.log('2. Visualizar gastos por categoria');
        console.log('3. Visualizar resumo geral de gastos');
        console.log('4. Sair');

        // Solicita ao usuário que digite o número da opção desejada
        const opcao = readline.question('Digite o numero da opcao: ');

        try {
            // Verifica qual opção foi escolhida pelo usuário
            if (opcao === '1') {
                // Solicita o valor do gasto ao usuário
                const valorInput = readline.question('Digite o valor do gasto: ');
                const valor = parseFloat(valorInput); // Converte a entrada para um número decimal

                // Valida se o valor é um número positivo
                if (isNaN(valor) || valor <= 0) {
                    console.log('Valor invalido. Insira um numero positivo.\n');
                    continue; // Volta ao início do loop
                }

                // Solicita a categoria do gasto ao usuário
                const categoria = readline.question('Digite a categoria do gasto (ex: alimentacao, transporte, lazer): ');

                // Solicita a data do gasto ao usuário
                const data = readline.question('Digite a data do gasto (ex: 2023-10-01): ');

                // Valida se a data está no formato correto (YYYY-MM-DD)
                const regexData = /^\d{4}-\d{2}-\d{2}$/;
                if (!regexData.test(data)) {
                    console.log('Data invalida. Use o formato YYYY-MM-DD.\n');
                    continue; // Volta ao início do loop
                }

                // Registra o gasto com os dados fornecidos
                registrarGasto(valor, categoria, data);
            } else if (opcao === '2') {
                // Solicita ao usuário a categoria para visualizar os gastos
                const categoria = readline.question('Digite a categoria para visualizar os gastos: ');
                // Chama a função para exibir os gastos da categoria selecionada
                visualizarGastosPorCategoria(categoria);
            } else if (opcao === '3') {
                // Chama a função para exibir o resumo geral de todos os gastos
                visualizarResumoGeral();
            } else if (opcao === '4') {
                // Exibe uma mensagem de despedida e encerra o programa
                console.log('Saindo...');
                break; // Sai do loop infinito
            } else {
                // Caso o usuário insira uma opção inválida, exibe uma mensagem de erro
                console.log('Opcao invalida. Tente novamente.\n');
            }
        } catch (error) {
            // Captura qualquer erro inesperado e exibe uma mensagem amigável
            console.error('Ocorreu um erro:', error.message);
        }
    }
}

// Exporta as funções e o array `gastos` para uso nos testes
module.exports = { registrarGasto, visualizarGastosPorCategoria, gastos };

// Verifica se o arquivo está sendo executado diretamente (e não importado como módulo)
if (require.main === module) {
    // Inicia o programa chamando a função principal
    main();
}