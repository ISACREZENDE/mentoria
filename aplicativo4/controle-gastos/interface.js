// Importa o módulo 'readline-sync' para permitir a leitura de entradas do usuário no terminal
const readline = require('readline-sync');

/**
 * Exibe uma mensagem de boas-vindas ao usuário.
 */
function exibirBoasVindas() {
    // Imprime uma mensagem de boas-vindas no console
    console.log('Bem-vindo ao Controle de Gastos!\n');
}

/**
 * Exibe o menu principal com as opções disponíveis para o usuário.
 */
function exibirMenu() {
    // Imprime as opções do menu no console
    console.log('Escolha uma opção:');
    console.log('1. Registrar um gasto');
    console.log('2. Visualizar gastos por categoria');
    console.log('3. Visualizar resumo geral de gastos');
    console.log('4. Sair');
}

/**
 * Solicita ao usuário que escolha uma opção do menu.
 * @returns {string} A opção escolhida pelo usuário.
 */
function obterOpcaoMenu() {
    // Solicita ao usuário que digite o número da opção desejada
    const opcao = readline.question('Digite o numero da opcao: ');
    return opcao; // Retorna a opção escolhida pelo usuário
}

/**
 * Solicita ao usuário que insira o valor de um gasto.
 * @returns {number} O valor do gasto inserido pelo usuário.
 */
function obterValorGasto() {
    // Solicita ao usuário que insira o valor do gasto
    const valorInput = readline.question('Digite o valor do gasto: ');
    const valor = parseFloat(valorInput); // Converte a entrada para um número decimal

    // Valida se o valor é um número positivo
    if (isNaN(valor) || valor <= 0) {
        console.log('Valor invalido. Insira um numero positivo.\n');
        return null; // Retorna null se o valor for inválido
    }

    return valor; // Retorna o valor válido
}

/**
 * Solicita ao usuário que insira a categoria de um gasto.
 * @returns {string} A categoria do gasto inserida pelo usuário.
 */
function obterCategoriaGasto() {
    // Solicita ao usuário que insira a categoria do gasto
    const categoria = readline.question('Digite a categoria do gasto (ex: alimentacao, transporte, lazer): ');
    return categoria.trim(); // Remove espaços em branco extras e retorna a categoria
}

/**
 * Solicita ao usuário que insira a data de um gasto.
 * @returns {string} A data do gasto inserida pelo usuário.
 */
function obterDataGasto() {
    // Solicita ao usuário que insira a data do gasto
    const data = readline.question('Digite a data do gasto (ex: 2023-10-01): ');

    // Valida se a data está no formato correto (YYYY-MM-DD)
    const regexData = /^\d{4}-\d{2}-\d{2}$/;
    if (!regexData.test(data)) {
        console.log('Data invalida. Use o formato YYYY-MM-DD.\n');
        return null; // Retorna null se a data for inválida
    }

    return data; // Retorna a data válida
}

/**
 * Exibe uma mensagem informando que um gasto foi registrado com sucesso.
 */
function exibirMensagemGastoRegistrado() {
    // Imprime uma mensagem de confirmação no console
    console.log('Gasto registrado com sucesso!\n');
}

/**
 * Exibe uma lista de gastos filtrados por categoria.
 * @param {Array} gastosFiltrados - Array contendo os gastos filtrados.
 * @param {string} categoria - Categoria dos gastos exibidos.
 */
function exibirGastosPorCategoria(gastosFiltrados, categoria) {
    // Verifica se há gastos na categoria selecionada
    if (gastosFiltrados.length > 0) {
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

/**
 * Exibe um resumo geral de todos os gastos, agrupados por categoria.
 * @param {Object} resumo - Objeto contendo o resumo dos gastos por categoria.
 */
function exibirResumoGeral(resumo) {
    // Verifica se há gastos registrados
    if (Object.keys(resumo).length === 0) {
        console.log('Nenhum gasto registrado.\n');
        return;
    }

    // Exibe o título do resumo geral de gastos
    console.log('Resumo geral de gastos:');
    // Itera sobre as categorias e seus totais no objeto 'resumo'
    for (const [categoria, total] of Object.entries(resumo)) {
        console.log(`- Categoria: ${categoria}, Total: R$ ${total.toFixed(2)}`);
    }
    console.log('\n'); // Pula uma linha para melhorar a formatação
}

/**
 * Exibe uma mensagem de despedida ao usuário.
 */
function exibirMensagemSaida() {
    // Imprime uma mensagem de despedida no console
    console.log('Saindo...');
}

// Exporta todas as funções para serem usadas em outros arquivos
module.exports = {
    exibirBoasVindas,
    exibirMenu,
    obterOpcaoMenu,
    obterValorGasto,
    obterCategoriaGasto,
    obterDataGasto,
    exibirMensagemGastoRegistrado,
    exibirGastosPorCategoria,
    exibirResumoGeral,
    exibirMensagemSaida
};
