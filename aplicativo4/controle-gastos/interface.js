const fs = require('fs');
const inquirer = require('inquirer');

// Array para armazenar os gastos registrados pelo usuário
let gastos = [];

// Função para carregar gastos salvos anteriormente em um arquivo JSON
function carregarGastos() {
    if (fs.existsSync('gastos.json')) {
        try {
            const dados = fs.readFileSync('gastos.json', 'utf8');
            gastos = JSON.parse(dados);
        } catch (error) {
            console.error('Erro ao carregar gastos:', error.message);
            gastos = [];
        }
    }
}

// Função para salvar os gastos atuais no arquivo 'gastos.json'
function salvarGastos() {
    try {
        fs.writeFileSync('gastos.json', JSON.stringify(gastos, null, 2));
    } catch (error) {
        console.error('Erro ao salvar gastos:', error.message);
    }
}

// Função para registrar um novo gasto
function registrarGasto(valor, categoria, data) {
    const gasto = { valor, categoria, data };
    gastos.push(gasto);
    salvarGastos();
    console.log('\nGasto registrado com sucesso!\n');
}

// Função para visualizar gastos filtrados por uma categoria específica
function visualizarGastosPorCategoria(categoria) {
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria === categoria);
    if (gastosFiltrados.length > 0) {
        console.log(`\nGastos na categoria "${categoria}":`);
        let total = 0;
        gastosFiltrados.forEach(gasto => {
            console.log(`- Valor: R$ ${gasto.valor.toFixed(2)}, Data: ${gasto.data}`);
            total += gasto.valor;
        });
        console.log(`Total gasto na categoria "${categoria}": R$ ${total.toFixed(2)}\n`);
    } else {
        console.log(`\nNenhum gasto encontrado na categoria "${categoria}".\n`);
    }
}

// Função para visualizar um resumo geral de todos os gastos, agrupados por categoria
function visualizarResumoGeral() {
    if (gastos.length === 0) {
        console.log('\nNenhum gasto registrado.\n');
        return;
    }
    const resumo = {};
    gastos.forEach(gasto => {
        if (!resumo[gasto.categoria]) {
            resumo[gasto.categoria] = 0;
        }
        resumo[gasto.categoria] += gasto.valor;
    });
    console.log('\nResumo geral de gastos:');
    for (const [categoria, total] of Object.entries(resumo)) {
        console.log(`- Categoria: ${categoria}, Total: R$ ${total.toFixed(2)}`);
    }
    console.log('\n');
}

// Função principal do aplicativo, responsável pela interação com o usuário
async function main() {
    console.log('Bem-vindo ao Controle de Gastos!\n');
    carregarGastos();

    while (true) {
        // Menu principal usando Inquirer.js
        const resposta = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcao',
                message: 'Escolha uma opção:',
                choices: [
                    'Registrar um gasto',
                    'Visualizar gastos por categoria',
                    'Visualizar resumo geral de gastos',
                    'Sair'
                ]
            }
        ]);

        try {
            if (resposta.opcao === 'Registrar um gasto') {
                // Solicita os detalhes do gasto ao usuário
                const { valor, categoria, data } = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'valor',
                        message: 'Digite o valor do gasto:',
                        validate: value => value > 0 || 'Insira um número positivo.'
                    },
                    {
                        type: 'input',
                        name: 'categoria',
                        message: 'Digite a categoria do gasto:'
                    },
                    {
                        type: 'input',
                        name: 'data',
                        message: 'Digite a data do gasto (YYYY-MM-DD):',
                        validate: value => /^\d{4}-\d{2}-\d{2}$/.test(value) || 'Use o formato YYYY-MM-DD.'
                    }
                ]);
                registrarGasto(valor, categoria, data);
            } else if (resposta.opcao === 'Visualizar gastos por categoria') {
                // Solicita a categoria para visualizar os gastos
                const { categoria } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'categoria',
                        message: 'Digite a categoria para visualizar os gastos:'
                    }
                ]);
                visualizarGastosPorCategoria(categoria);
            } else if (resposta.opcao === 'Visualizar resumo geral de gastos') {
                visualizarResumoGeral();
            } else if (resposta.opcao === 'Sair') {
                console.log('Saindo...');
                break;
            }
        } catch (error) {
            console.error('\nOcorreu um erro:', error.message, '\n');
        }
    }
}

// Verifica se o arquivo está sendo executado diretamente (e não importado como módulo)
if (require.main === module) {
    main();
}