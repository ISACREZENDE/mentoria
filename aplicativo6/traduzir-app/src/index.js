// Importa o módulo de tradução
const { translateText } = require('./translator');

/**
 * Função principal do aplicativo.
 * Traduz um texto de exemplo e exibe o resultado.
 */
async function main() {
    const text = 'Olá, mundo!'; // Texto a ser traduzido
    const targetLanguage = 'en'; // Idioma de destino (inglês)

    console.log(`Traduzindo: "${text}" para ${targetLanguage}...`);

    // Chama a função de tradução
    const translatedText = await translateText(text, targetLanguage);

    if (translatedText) {
        console.log('Texto traduzido:', translatedText);
    } else {
        console.log('Falha na tradução.');
    }
}

// Executa o aplicativo
main();
