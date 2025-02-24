// Importa a função translateText do arquivo translator.js
const { translateText } = require('./src/translator');
const readline = require('readline');

/**
 * Função principal do aplicativo.
 * Permite ao usuário inserir o texto e o idioma de destino via linha de comando.
 */
async function main() {
    // Configura o módulo readline para ler entradas do usuário
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Pergunta ao usuário qual texto deseja traduzir
    const text = await askQuestion(rl, 'Digite o texto que deseja traduzir: ');

    // Pergunta ao usuário para qual idioma deseja traduzir
    const targetLanguage = await askQuestion(rl, 'Digite o idioma de destino (ex: en, es, fr): ');

    // Fecha a interface readline após obter as entradas
    rl.close();

    // Exibe uma mensagem informando que a tradução está em andamento
    console.log(`Traduzindo: "${text}" para ${targetLanguage}...`);

    // Chama a função de tradução
    const translatedText = await translateText(text, targetLanguage);

    // Verifica se a tradução foi bem-sucedida
    if (translatedText) {
        console.log('Texto traduzido:', translatedText); // Exibe o texto traduzido
    } else {
        console.log('Falha na tradução.'); // Exibe uma mensagem de falha
    }
}

/**
 * Função auxiliar para perguntar algo ao usuário e retornar a resposta.
 * @param {readline.Interface} rl - Instância do readline.
 * @param {string} question - Pergunta a ser feita ao usuário.
 * @returns {Promise<string>} - Resposta do usuário.
 */
function askQuestion(rl, question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim()); // Remove espaços extras da resposta
        });
    });
}

// Executa a função principal
main();