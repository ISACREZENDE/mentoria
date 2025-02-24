// interface.js
const readline = require('readline');
const {
    validarCPF,
    validarCNPJ,
    validarRG,
    validarTituloEleitor,
    validarCNH,
    validarPassaporte
} = require('./src/validadorDocumentos');

// Cria uma interface para leitura de entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para exibir o menu principal
function exibirMenu() {
    console.log('\n--- Validador de Documentos ---');
    console.log('1. Validar CPF');
    console.log('2. Validar CNPJ');
    console.log('3. Validar RG');
    console.log('4. Validar Título de Eleitor');
    console.log('5. Validar CNH');
    console.log('6. Validar Passaporte');
    console.log('0. Sair');
    console.log('--------------------------------\n');
}

// Função para solicitar ao usuário que insira um documento
function solicitarDocumento(mensagem) {
    return new Promise((resolve) => {
        rl.question(mensagem, (documento) => {
            resolve(documento);
        });
    });
}

// Função principal que controla o fluxo do programa
async function iniciarPrograma() {
    let continuar = true;

    while (continuar) {
        exibirMenu();
        const escolha = await solicitarDocumento('Escolha uma opção (0-6): ');

        switch (escolha) {
            case '1':
                const cpf = await solicitarDocumento('Digite o CPF (ex: 123.456.789-09): ');
                console.log(validarCPF(cpf) ? 'CPF válido!' : 'CPF inválido!');
                break;
            case '2':
                const cnpj = await solicitarDocumento('Digite o CNPJ (ex: 12.345.678/0001-95): ');
                console.log(validarCNPJ(cnpj) ? 'CNPJ válido!' : 'CNPJ inválido!');
                break;
            case '3':
                const rg = await solicitarDocumento('Digite o RG (ex: 123456789): ');
                console.log(validarRG(rg) ? 'RG válido!' : 'RG inválido!');
                break;
            case '4':
                const titulo = await solicitarDocumento('Digite o Título de Eleitor (ex: 123456789012): ');
                console.log(validarTituloEleitor(titulo) ? 'Título de Eleitor válido!' : 'Título de Eleitor inválido!');
                break;
            case '5':
                const cnh = await solicitarDocumento('Digite a CNH (ex: 12345678901): ');
                console.log(validarCNH(cnh) ? 'CNH válida!' : 'CNH inválida!');
                break;
            case '6':
                const passaporte = await solicitarDocumento('Digite o Passaporte (ex: AB123456): ');
                console.log(validarPassaporte(passaporte) ? 'Passaporte válido!' : 'Passaporte inválido!');
                break;
            case '0':
                console.log('Saindo do programa...');
                continuar = false;
                break;
            default:
                console.log('Opção inválida! Por favor, tente novamente.');
        }
    }

    rl.close();
}

// Inicia o programa
iniciarPrograma();