// Importa as dependências necessárias
const express = require('express');
const { translate } = require('@vitalets/google-translate-api');

// Cria o servidor Express
const app = express();
const PORT = 3000;

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

/**
 * Rota padrão (GET /)
 * Responde com uma mensagem simples para verificar se o servidor está funcionando.
 */
app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

/**
 * Rota para traduzir texto.
 * Exemplo de requisição: POST /translate
 * Body: { text: "Olá", targetLanguage: "en" }
 */
app.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;

    // Validação dos dados
    if (!text || !targetLanguage) {
        return res.status(400).json({ error: 'Os campos "text" e "targetLanguage" são obrigatórios.' });
    }

    try {
        // Realiza a tradução
        const result = await translate(text, { to: targetLanguage });

        // Retorna o texto traduzido
        res.json({ translatedText: result.text });
    } catch (error) {
        console.error('Erro ao traduzir:', error);
        res.status(500).json({ error: 'Falha na tradução.' });
    }
});

// Exporta o aplicativo Express para uso nos testes
module.exports = app;

// Inicia o servidor apenas se este arquivo for executado diretamente
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}