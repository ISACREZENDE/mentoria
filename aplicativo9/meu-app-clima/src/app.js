
// Importando o pacote node-fetch corretamente
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Chave da API do WeatherAPI (substitua pela sua chave)
const CHAVE_API = '9813c4fbcc234e27b09211657251602';

// Função principal para buscar o clima de uma cidade
async function buscarClima(cidade) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${CHAVE_API}&q=${cidade}&lang=pt`;

    try {
        const resposta = await fetch(url);
        const dadosClima = await resposta.json();

        // Exibe a resposta completa da API para depuração
        console.log('Resposta da API:', dadosClima);

        // Verifica se a cidade foi encontrada e se os dados estão completos
        if (dadosClima.error) {
            throw new Error(dadosClima.error.message);
        }

        return dadosClima;
    } catch (erro) {
        console.error('Erro ao buscar o clima:', erro.message);
        return null;
    }
}

// Função para exibir os dados do clima no console
function exibirClima(dadosClima) {
    if (!dadosClima) {
        console.log('Não foi possível exibir os dados do clima.');
        return;
    }

    // Extraindo informações importantes
    const cidade = dadosClima.location.name;
    const temperatura = dadosClima.current.temp_c;
    const umidade = dadosClima.current.humidity;
    const vento = dadosClima.current.wind_kph;
    const pressao = dadosClima.current.pressure_mb;
    const descricao = dadosClima.current.condition.text;

    // Exibindo os dados no console
    console.log(`Clima em ${cidade}:`);
    console.log(`- Temperatura: ${temperatura}°C`);
    console.log(`- Umidade: ${umidade}%`);
    console.log(`- Vento: ${vento} km/h`);
    console.log(`- Pressão: ${pressao} hPa`);
    console.log(`- Condição: ${descricao}`);
}

// Função para verificar alertas de clima severo
function verificarAlertas(dadosClima) {
    const condicao = dadosClima.current.condition.text.toLowerCase();
    const condicoesSeveras = ['thunderstorm', 'tornado', 'hurricane', 'squall'];

    if (condicoesSeveras.some(severa => condicao.includes(severa))) {
        console.log(`⚠️ ALERTA: Clima severo detectado (${condicao}). Tome cuidado!`);
    } else {
        console.log('Nenhum alerta de clima severo no momento.');
    }
}

// Função principal para rodar o aplicativo
async function main() {
    const cidade = 'Cuiabá'; // Pode ser substituído por uma entrada do usuário
    console.log(`Buscando clima para: ${cidade}...\n`);

    const dadosClima = await buscarClima(cidade);

    if (dadosClima) {
        exibirClima(dadosClima);
        verificarAlertas(dadosClima);
    } else {
        console.log('Não foi possível obter os dados do clima.');
    }
}

// Rodando o aplicativo
main();
