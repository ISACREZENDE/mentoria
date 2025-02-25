// Seleciona os elementos da interface
const textArea = document.getElementById('text');
const languageInput = document.getElementById('language');
const translateButton = document.getElementById('translateButton');
const resultDiv = document.getElementById('result');

// Adiciona um evento de clique ao botão de tradução
translateButton.addEventListener('click', async () => {
    const text = textArea.value.trim(); // Obtém o texto do usuário
    const targetLanguage = languageInput.value.trim(); // Obtém o idioma de destino

    // Verifica se os campos estão preenchidos
    if (!text || !targetLanguage) {
        resultDiv.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    resultDiv.textContent = 'Traduzindo...'; // Exibe mensagem de carregamento

    try {
        // Envia uma requisição POST para o backend
        const response = await fetch('http://localhost:3000/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, targetLanguage })
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Exibe o resultado
        if (data.translatedText) {
            resultDiv.textContent = `Texto traduzido: ${data.translatedText}`;
        } else {
            resultDiv.textContent = 'Falha na tradução.';
        }
    } catch (error) {
        console.error('Erro ao comunicar com o servidor:', error);
        resultDiv.textContent = 'Erro ao conectar ao servidor. Verifique se o backend está rodando.';
    }
});