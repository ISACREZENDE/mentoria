// Importa as funções que serão testadas
const { registrarGasto, visualizarGastosPorCategoria, gastos } = require('../app');

// Limpa o array de gastos antes de cada teste
beforeEach(() => {
    gastos.length = 0;
});

// Teste para a função registrarGasto
test('Registrar um gasto', () => {
    // Mock do console.log para evitar saída no terminal
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    registrarGasto(50, 'alimentacao', '2023-10-01');
    expect(gastos).toEqual([{ valor: 50, categoria: 'alimentacao', data: '2023-10-01' }]);

    // Restaura o console.log original
    consoleSpy.mockRestore();
});

// Teste para a função visualizarGastosPorCategoria
test('Visualizar gastos por categoria', () => {
    // Adiciona gastos de teste
    registrarGasto(50, 'alimentacao', '2023-10-01');
    registrarGasto(30, 'transporte', '2023-10-02');

    // Mock do console.log para capturar a saída
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Chama a função visualizarGastosPorCategoria
    visualizarGastosPorCategoria('alimentacao');

    // Verifica se a função chamou console.log com os valores esperados
    expect(consoleSpy).toHaveBeenCalledWith('Gastos na categoria "alimentacao":');
    expect(consoleSpy).toHaveBeenCalledWith('- Valor: R$ 50.00, Data: 2023-10-01');

    // Restaura o console.log original
    consoleSpy.mockRestore();
});
