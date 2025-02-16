// Importa a biblioteca de tradução corretamente
const { translate } = require('@vitalets/google-translate-api');

// Lista de idiomas suportados (exemplo básico)
const supportedLanguages = ['en', 'es', 'fr', 'pt', 'de', 'it', 'ja', 'zh']; // Adicione outros idiomas conforme necessário

/**
 * Função para traduzir um texto para um idioma específico.
 * @param {string} text - O texto a ser traduzido.
 * @param {string} targetLanguage - O idioma de destino (ex: 'en' para inglês).
 * @returns {Promise<string>} - O texto traduzido ou null se o idioma não for suportado.
 */
async function translateText(text, targetLanguage) {
    try {
        // Verifica se o idioma de destino é suportado
        if (!supportedLanguages.includes(targetLanguage)) {
            console.error('Idioma não suportado:', targetLanguage);
            return null;
        }

        // Usa a biblioteca para traduzir o texto
        const result = await translate(text, { to: targetLanguage });
        return result.text; // Retorna o texto traduzido
    } catch (error) {
        // Se houver um erro, exibe uma mensagem e retorna null
        console.error('Erro ao traduzir:', error);
        return null;
    }
}

// Exporta a função para ser usada em outros arquivos
module.exports = { translateText };