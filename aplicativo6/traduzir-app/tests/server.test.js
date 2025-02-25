// Importa as dependências necessárias
const request = require('supertest');
const app = require('../src/server'); // Importa o aplicativo Express

// Mock da função de tradução para evitar chamadas reais à API
jest.mock('@vitalets/google-translate-api', () => ({
    translate: jest.fn(() => Promise.resolve({ text: 'Hello' }))
}));

describe('Testes do servidor', () => {
    it('Deve traduzir texto corretamente', async () => {
        const response = await request(app)
            .post('/translate')
            .send({ text: 'Olá', targetLanguage: 'en' })
            .expect(200);

        // Verifica se o texto traduzido está correto
        expect(response.body.translatedText).toBe('Hello');
    });

    it('Deve retornar erro para requisições inválidas', async () => {
        const response = await request(app)
            .post('/translate')
            .send({}) // Requisição sem corpo
            .expect(400); // Agora espera-se o código 400 (Bad Request)

        // Verifica se a resposta contém uma mensagem de erro
        expect(response.body.error).toBe('Os campos "text" e "targetLanguage" são obrigatórios.');
    });
});