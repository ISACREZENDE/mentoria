// Importa a função translateText do arquivo translator.js
const { translateText } = require('../src/translator');

/**
 * Teste para verificar a tradução de um texto.
 */
test('Traduzir "Olá, mundo!" para inglês', async () => {
    const text = 'Olá, mundo!'; // Texto a ser traduzido
    const targetLanguage = 'en'; // Idioma de destino (inglês)

    // Chama a função de tradução
    const translatedText = await translateText(text, targetLanguage);

    // Verifica se o texto traduzido corresponde ao esperado (case-insensitive)
    expect(translatedText).toMatch(/Hello[, ]?world!/i); // Aceita variações como "Hello, world!" ou "Hello World!"
});

/**
 * Teste para verificar o tratamento de erros com idioma inválido.
 */
test('Traduzir com idioma inválido', async () => {
    const text = 'Olá, mundo!'; // Texto a ser traduzido
    const targetLanguage = 'xx'; // Idioma inválido

    // Substitui temporariamente console.error por uma função mock para evitar mensagens no console
    const originalConsoleError = console.error;
    console.error = jest.fn();

    // Chama a função de tradução
    const translatedText = await translateText(text, targetLanguage);

    // Restaura o comportamento original de console.error
    console.error = originalConsoleError;

    // Verifica se a tradução retornou null, indicando falha
    expect(translatedText).toBeNull();
});