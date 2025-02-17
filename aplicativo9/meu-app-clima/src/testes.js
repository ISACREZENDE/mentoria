const { buscarClima, verificarAlertas } = require('./app');

// Testes para o aplicativo de clima
async function testarAplicativo() {
    console.log('Iniciando testes...\n');

    // Teste 1: Buscar clima de uma cidade válida
    console.log('Teste 1: Buscar clima de uma cidade válida (São Paulo)');
    const dadosClimaValido = await buscarClima('São Paulo');
    if (dadosClimaValido) {
        console.log('✅ Teste 1 passou: Dados do clima encontrados.\n');
    } else {
        console.log('❌ Teste 1 falhou: Dados do clima não encontrados.\n');
    }

    // Teste 2: Buscar clima de uma cidade inválida
    console.log('Teste 2: Buscar clima de uma cidade inválida (CidadeInexistente)');
    const dadosClimaInvalido = await buscarClima('CidadeInexistente');
    if (!dadosClimaInvalido) {
        console.log('✅ Teste 2 passou: Cidade inválida detectada.\n');
    } else {
        console.log('❌ Teste 2 falhou: Cidade inválida não foi detectada.\n');
    }

    // Teste 3: Verificar alertas de clima severo
    console.log('Teste 3: Verificar alertas de clima severo');
    if (dadosClimaValido) {
        verificarAlertas(dadosClimaValido);
        console.log('✅ Teste 3 passou: Alertas verificados.\n');
    } else {
        console.log('❌ Teste 3 falhou: Dados do clima não disponíveis.\n');
    }
}

// Rodando os testes
testarAplicativo();
