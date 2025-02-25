// Importa o módulo nativo 'readline' para interação no terminal
const readline = require('readline');

// Classe principal do aplicativo de tradução
class TradutorApp {
  constructor() {
    // Dicionário interno com traduções simuladas
    this.dicionario = {
      en: { // Traduções em inglês
        hello: 'Hello', // Tradução de "hello" para inglês
        world: 'World', // Tradução de "world" para inglês
        goodbye: 'Goodbye', // Tradução de "goodbye" para inglês
        love: 'Love', // Tradução de "love" para inglês
        you: 'You', // Tradução de "you" para inglês
        'i love you': 'I love you', // Tradução de "i love you" para inglês
      },
      pt: { // Traduções em português
        hello: 'Olá', // Tradução de "hello" para português
        world: 'Mundo', // Tradução de "world" para português
        goodbye: 'Adeus', // Tradução de "goodbye" para português
        love: 'Amor', // Tradução de "love" para português
        you: 'Você', // Tradução de "you" para português
        'amo você': 'I love you', // Tradução de "amo você" para português
      },
      es: { // Traduções em espanhol
        hello: 'Hola', // Tradução de "hello" para espanhol
        world: 'Mundo', // Tradução de "world" para espanhol
        goodbye: 'Adiós', // Tradução de "goodbye" para espanhol
        love: 'Amor', // Tradução de "love" para espanhol
        you: 'Tú', // Tradução de "you" para espanhol
        'te amo': 'I love you', // Tradução de "te amo" para espanhol
      },
    };

    this.favoritos = []; // Armazena traduções favoritas
    this.historico = []; // Armazena o histórico de traduções
  }

  /**
   * Traduz um texto para o idioma desejado usando o dicionário interno.
   * @param {string} texto - Texto a ser traduzido.
   * @param {string} idiomaDestino - Idioma de destino (ex: 'en', 'pt', 'es').
   * @returns {string} - Texto traduzido ou mensagem de erro.
   */
  traduzirTexto(texto, idiomaDestino) {
    const palavra = texto.toLowerCase(); // Normaliza o texto para minúsculas para facilitar a busca no dicionário
    const traducao = this.dicionario[idiomaDestino]?.[palavra]; // Busca a tradução no dicionário

    if (!traducao) {
      // Se a tradução não for encontrada, exibe uma mensagem amigável
      console.error(`Desculpe, a tradução para "${texto}" em ${idiomaDestino} não está disponível.`);
      console.log('Tente outra palavra ou frase.');
      return `Tradução não disponível`; // Retorna uma mensagem padrão se a tradução não existir
    }

    // Salva no histórico APENAS se a tradução for bem-sucedida
    this.historico.push({ texto, traducao, idiomaDestino });

    return traducao; // Retorna a tradução encontrada
  }

  /**
   * Adiciona uma tradução aos favoritos.
   * @param {string} texto - Texto original.
   * @param {string} traducao - Texto traduzido.
   * @param {string} idiomaDestino - Idioma de destino.
   */
  adicionarAosFavoritos(texto, traducao, idiomaDestino) {
    this.favoritos.push({ texto, traducao, idiomaDestino }); // Adiciona a tradução à lista de favoritos
    console.log('Tradução adicionada aos favoritos.'); // Exibe uma mensagem de confirmação
  }

  /**
   * Exibe o histórico de traduções.
   */
  exibirHistorico() {
    console.log('Histórico de traduções:'); // Título da seção
    if (this.historico.length === 0) {
      console.log('Nenhuma tradução registrada no histórico.'); // Mensagem caso o histórico esteja vazio
      return;
    }
    this.historico.forEach((item, index) => {
      // Itera sobre o histórico e exibe cada tradução
      console.log(`${index + 1}. Texto: ${item.texto}, Tradução: ${item.traducao}, Idioma: ${item.idiomaDestino}`);
    });
  }

  /**
   * Exibe os favoritos salvos.
   */
  exibirFavoritos() {
    console.log('Favoritos:'); // Título da seção
    if (this.favoritos.length === 0) {
      console.log('Nenhuma tradução salva nos favoritos.'); // Mensagem caso não haja favoritos
      return;
    }
    this.favoritos.forEach((item, index) => {
      // Itera sobre os favoritos e exibe cada tradução
      console.log(`${index + 1}. Texto: ${item.texto}, Tradução: ${item.traducao}, Idioma: ${item.idiomaDestino}`);
    });
  }

  /**
   * Inicia a interface interativa no terminal.
   */
  iniciarInterface() {
    // Cria uma interface de leitura/escrita no terminal
    const rl = readline.createInterface({
      input: process.stdin, // Entrada de dados (teclado)
      output: process.stdout, // Saída de dados (terminal)
    });

    // Função recursiva para perguntar ao usuário qual ação deseja realizar
    const perguntarAcao = () => {
      console.log('\nO que você deseja fazer?'); // Exibe as opções disponíveis
      console.log('1. Traduzir texto');
      console.log('2. Exibir histórico');
      console.log('3. Exibir favoritos');
      console.log('4. Sair');

      // Pergunta ao usuário qual opção ele deseja escolher
      rl.question('Escolha uma opção (1-4): ', (opcao) => {
        switch (opcao.trim()) {
          case '1':
            // Opção 1: Traduzir texto
            rl.question('Digite o texto a ser traduzido: ', (texto) => {
              rl.question('Escolha o idioma de destino (pt/en/es): ', (idioma) => {
                const traducao = this.traduzirTexto(texto, idioma); // Chama a função para traduzir o texto
                console.log(`Tradução: ${traducao}`); // Exibe a tradução
                perguntarAcao(); // Volta ao menu principal
              });
            });
            break;

          case '2':
            // Opção 2: Exibir histórico
            this.exibirHistorico(); // Chama a função para exibir o histórico
            perguntarAcao(); // Volta ao menu principal
            break;

          case '3':
            // Opção 3: Exibir favoritos
            this.exibirFavoritos(); // Chama a função para exibir os favoritos
            perguntarAcao(); // Volta ao menu principal
            break;

          case '4':
            // Opção 4: Sair
            console.log('Até logo!'); // Mensagem de despedida
            rl.close(); // Encerra a interface de leitura/escrita
            break;

          default:
            // Caso o usuário insira uma opção inválida
            console.log('Opção inválida. Tente novamente.');
            perguntarAcao(); // Volta ao menu principal
        }
      });
    };

    perguntarAcao(); // Inicia o loop de perguntas
  }
}

// Exporta a classe para uso em outros arquivos
module.exports = TradutorApp;

// Verifica se o arquivo está sendo executado diretamente (e não importado como módulo)
if (require.main === module) {
  const app = new TradutorApp(); // Cria uma instância do aplicativo
  app.iniciarInterface(); // Inicia a interface interativa
}