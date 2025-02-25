// Importa a classe principal do aplicativo
const TradutorApp = require('./index');

console.log('Iniciando testes...'); // Mensagem inicial indicando o início dos testes

// Teste 1: Traduzir texto corretamente
try {
  const app = new TradutorApp(); // Cria uma nova instância do aplicativo
  const texto = 'hello'; // Texto a ser traduzido
  const idiomaDestino = 'pt'; // Idioma de destino
  const traducao = app.traduzirTexto(texto, idiomaDestino); // Chama a função de tradução

  if (traducao === 'Olá') {
    console.log('Teste 1 passou: Tradução correta.'); // Mensagem de sucesso
  } else {
    console.error('Teste 1 falhou: Tradução incorreta.'); // Mensagem de falha
  }
} catch (error) {
  console.error('Teste 1 falhou:', error.message); // Captura e exibe erros
}

// Teste 2: Adicionar tradução aos favoritos
try {
  const app = new TradutorApp(); // Cria uma nova instância do aplicativo
  const texto = 'hello'; // Texto original
  const traducao = 'Olá'; // Tradução correspondente
  const idiomaDestino = 'pt'; // Idioma de destino

  app.adicionarAosFavoritos(texto, traducao, idiomaDestino); // Chama a função para adicionar aos favoritos

  if (app.favoritos.length === 1 && app.favoritos[0].texto === texto) {
    console.log('Teste 2 passou: Favorito adicionado corretamente.'); // Mensagem de sucesso
  } else {
    console.error('Teste 2 falhou: Favorito não foi adicionado.'); // Mensagem de falha
  }
} catch (error) {
  console.error('Teste 2 falhou:', error.message); // Captura e exibe erros
}

// Teste 3: Exibir histórico de traduções
try {
  const app = new TradutorApp(); // Cria uma nova instância do aplicativo
  app.traduzirTexto('hello', 'pt'); // Traduz "hello" para português
  app.traduzirTexto('world', 'es'); // Traduz "world" para espanhol

  console.log('Histórico final:', app.historico); // Exibe o histórico final para depuração

  // Verifica se o histórico contém as traduções esperadas
  if (
    app.historico.length === 2 &&
    app.historico[0].texto === 'hello' &&
    app.historico[0].traducao === 'Olá' &&
    app.historico[1].texto === 'world' &&
    app.historico[1].traducao === 'Mundo'
  ) {
    console.log('Teste 3 passou: Histórico verificado com sucesso.'); // Mensagem de sucesso
  } else {
    console.error('Teste 3 falhou: Histórico incorreto.'); // Mensagem de falha
    console.error('Histórico atual:', app.historico); // Exibe o histórico atual para depuração
  }
} catch (error) {
  console.error('Teste 3 falhou:', error.message); // Captura e exibe erros
}

// Teste 4: Tentar traduzir uma palavra inexistente no dicionário
try {
  const app = new TradutorApp(); // Cria uma nova instância do aplicativo
  const texto = 'palavra_inexistente'; // Palavra que não existe no dicionário
  const idiomaDestino = 'en'; // Idioma de destino
  const traducao = app.traduzirTexto(texto, idiomaDestino); // Chama a função de tradução

  if (traducao === 'Tradução não disponível') {
    console.log('Teste 4 passou: Tratamento de palavras inexistentes funcionando corretamente.'); // Mensagem de sucesso
  } else {
    console.error('Teste 4 falhou: A tradução de uma palavra inexistente retornou um valor inesperado.'); // Mensagem de falha
  }
} catch (error) {
  console.error('Teste 4 falhou:', error.message); // Captura e exibe erros
}