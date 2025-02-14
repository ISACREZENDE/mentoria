const readline = require('readline-sync');

// Array para armazenar os gastos
let gastos = [];

// Função para registrar um gasto
function registrarGasto(valor, categoria, data) {
    const gasto = {
        valor: valor,
        categoria: categoria,
        data: data
    };
    gastos.push(gasto);
    console.log('Gasto registrado com sucesso!\n');
}

// Função para visualizar gastos por categoria
function visualizarGastosPorCategoria(categoria) {
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria === categoria);

    if (gastosFiltrados.length > 0) {
        console.log(`Gastos na categoria "${categoria}":`);
        gastosFiltrados.forEach(gasto => {
            console.log(`- Valor: R$ ${gasto.valor.toFixed(2)}, Data: ${gasto.data}`);
        });
    } else {
        console.log(`Nenhum gasto encontrado na categoria "${categoria}".`);
    }
    console.log('\n');
}

// Função principal do aplicativo (interação com o usuário)
function main() {
    console.log('Bem-vindo ao Controle de Gastos!\n');

    while (true) {
        console.log('Escolha uma opcao:');
        console.log('1. Registrar um gasto');
        console.log('2. Visualizar gastos por categoria');
        console.log('3. Sair');

        const opcao = readline.question('Digite o numero da opcao: ');

        if (opcao === '1') {
            const valor = parseFloat(readline.question('Digite o valor do gasto: '));
            const categoria = readline.question('Digite a categoria do gasto (ex: alimentacao, transporte, lazer): ');
            const data = readline.question('Digite a data do gasto (ex: 2023-10-01): ');
            registrarGasto(valor, categoria, data);
        } else if (opcao === '2') {
            const categoria = readline.question('Digite a categoria para visualizar os gastos: ');
            visualizarGastosPorCategoria(categoria);
        } else if (opcao === '3') {
            console.log('Saindo...');
            break;
        } else {
            console.log('Opcao invalida. Tente novamente.\n');
        }
    }
}

// Exporta as funções para uso nos testes
module.exports = { registrarGasto, visualizarGastosPorCategoria, gastos };

// Inicia o aplicativo apenas se o arquivo for executado diretamente
if (require.main === module) {
    main();
}
