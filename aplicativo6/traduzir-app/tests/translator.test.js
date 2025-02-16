// Importa a função de tradução
const { translateText } = require('../src/translator');

/**
 * Teste para verificar a tradução de um texto.
 */
test('Traduzir "Olá, mundo!" para inglês', async () => {
    const text = 'Olá, mundo!';
    const targetLanguage = 'en';

    // Chama a função de tradução
    const translatedText = await translateText(text, targetLanguage);

    // Verifica se o texto foi traduzido corretamente
    expect(translatedText).toMatch(/Hello[, ]?world!/i); // Aceita "Hello, world!" ou "Hello World!"
});

/**
 * Teste para verificar o tratamento de erros com idioma inválido.
 */
test('Traduzir com idioma inválido', async () => {
    const text = 'Olá, mundo!';
    const targetLanguage = 'xx'; // Idioma inválido

    // Suprime o console.error durante este teste
    const originalConsoleError = console.error;
    console.error = jest.fn(); // Substitui console.error por uma função mock

    // Chama a função de tradução
    const translatedText = await translateText(text, targetLanguage);

    // Restaura o console.error original
    console.error = originalConsoleError;

    // Verifica se a tradução falhou
    expect(translatedText).toBeNull();
});
