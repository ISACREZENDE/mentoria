// Importa a função de tradução da biblioteca @vitalets/google-translate-api
const { translate } = require('@vitalets/google-translate-api');

// Lista de idiomas suportados pelo aplicativo (códigos ISO 639-1)
const supportedLanguages = ['en', 'es', 'fr', 'pt', 'de', 'it', 'ja', 'zh']; // Adicione outros idiomas conforme necessário

/**
 * Função para traduzir um texto para um idioma específico.
 * @param {string} text - O texto a ser traduzido.
 * @param {string} targetLanguage - O idioma de destino (ex: 'en' para inglês).
 * @returns {Promise<string|null>} - O texto traduzido ou null em caso de erro.
 */
async function translateText(text, targetLanguage) {
    try {
        // Verifica se o idioma de destino está na lista de idiomas suportados
        if (!supportedLanguages.includes(targetLanguage)) {
            console.error('Idioma não suportado:', targetLanguage);
            return null; // Retorna null se o idioma não for suportado
        }

        // Usa a biblioteca para traduzir o texto para o idioma de destino
        const result = await translate(text, { to: targetLanguage });

        // Retorna o texto traduzido
        return result.text;
    } catch (error) {
        // Captura e exibe qualquer erro ocorrido durante a tradução
        console.error('Erro ao traduzir:', error);

        // Retorna null em caso de falha
        return null;
    }
}

// Exporta a função translateText para ser usada em outros arquivos
module.exports = { translateText };