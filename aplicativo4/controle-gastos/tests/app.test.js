// Importa as funções e o array `gastos` do arquivo principal (`app.js`) para serem testadas
const { registrarGasto, visualizarGastosPorCategoria, gastos } = require('../app');

// Antes de cada teste, limpa o array `gastos` para garantir que os testes sejam independentes
beforeEach(() => {
    // Define o comprimento do array `gastos` como 0, removendo todos os elementos
    gastos.length = 0;
});

// Teste para verificar se a função `registrarGasto` funciona corretamente
test('Registrar um gasto', () => {
    // Mock (simulação) do console.log para evitar saídas no terminal durante o teste
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Chama a função `registrarGasto` com valores de exemplo
    registrarGasto(50, 'alimentacao', '2023-10-01');

    // Verifica se o array `gastos` foi atualizado corretamente com o novo gasto
    expect(gastos).toEqual([
        { valor: 50, categoria: 'alimentacao', data: '2023-10-01' }
    ]);

    // Restaura o comportamento original do console.log após o teste
    consoleSpy.mockRestore();
});

// Teste para verificar se a função `visualizarGastosPorCategoria` funciona corretamente
test('Visualizar gastos por categoria', () => {
    // Adiciona dois gastos de exemplo ao array `gastos`
    registrarGasto(50, 'alimentacao', '2023-10-01');
    registrarGasto(30, 'transporte', '2023-10-02');

    // Mock (simulação) do console.log para capturar as mensagens exibidas pela função
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Chama a função `visualizarGastosPorCategoria` para a categoria "alimentacao"
    visualizarGastosPorCategoria('alimentacao');

    // Verifica se a função chamou console.log com as mensagens esperadas
    expect(consoleSpy).toHaveBeenCalledWith('Gastos na categoria "alimentacao":');
    expect(consoleSpy).toHaveBeenCalledWith('- Valor: R$ 50.00, Data: 2023-10-01');

    // Restaura o comportamento original do console.log após o teste
    consoleSpy.mockRestore();
});