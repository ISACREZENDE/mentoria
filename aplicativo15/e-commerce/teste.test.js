// Importa o módulo Produto, que define a classe para representar um produto
const Produto = require('./produto'); // Importa a classe Produto

// Importa o módulo Carrinho, que define a classe para gerenciar o carrinho de compras
const Carrinho = require('./carrinho'); // Importa a classe Carrinho

// Importa o módulo HistoricoCompras, que gerencia o histórico de compras realizadas
const HistoricoCompras = require('./historicoCompras'); // Importa a classe HistoricoCompras

// Importa o módulo SistemaCupons, que gerencia os cupons de desconto
const SistemaCupons = require('./sistemaCupons'); // Importa a classe SistemaCupons

// Define uma suíte de testes para o sistema de e-commerce utilizando Jest
describe('Teste do Sistema de E-commerce', () => {
    // Teste para verificar a criação de produtos e o cálculo correto do carrinho
    test('Verifica a criação de produtos e cálculo do carrinho', () => {
        // Cria uma instância de Produto para uma "Camiseta" com preço 25.00 e categoria "Roupas"
        const produto1 = new Produto("Camiseta", 25.00, "Roupas");
        // Cria uma instância de Produto para um "Livro" com preço 45.00 e categoria "Livros"
        const produto2 = new Produto("Livro", 45.00, "Livros");
        
        // Cria uma instância do Carrinho para adicionar os produtos
        const carrinho = new Carrinho();
        // Adiciona 2 unidades do produto1 ao carrinho
        carrinho.adicionarItem(produto1, 2);
        // Adiciona 1 unidade do produto2 ao carrinho
        carrinho.adicionarItem(produto2, 1);
        
        // Verifica se o total calculado no carrinho é igual a 95 (2 * 25 + 45 = 95)
        expect(carrinho.calcularTotal()).toBe(95); // 2 * 25 + 45 = 95
    });

    // Teste para verificar o processo de checkout e o registro no histórico de compras
    test('Testa o checkout e histórico de compras', () => {
        // Cria uma instância de Produto para uma "Camiseta" com preço 25.00 e categoria "Roupas"
        const produto1 = new Produto("Camiseta", 25.00, "Roupas");
        // Cria uma instância de Produto para um "Livro" com preço 45.00 e categoria "Livros"
        const produto2 = new Produto("Livro", 45.00, "Livros");
        // Cria uma instância do Carrinho para adicionar os produtos
        const carrinho = new Carrinho();
        // Adiciona 2 unidades do produto1 ao carrinho
        carrinho.adicionarItem(produto1, 2);
        // Adiciona 1 unidade do produto2 ao carrinho
        carrinho.adicionarItem(produto2, 1);
        
        // Realiza o checkout do carrinho e obtém o total e os itens comprados
        const { total, itens } = carrinho.realizarCheckout();
        // Cria uma instância do Histórico de Compras para registrar o pedido
        const historico = new HistoricoCompras();
        // Adiciona o pedido (total e itens) ao histórico de compras
        historico.adicionarPedido(total, itens);
        
        // Verifica se o histórico possui exatamente 1 compra registrada
        expect(historico.getTotalCompras()).toBe(1);
        // Verifica se o total da primeira compra está próximo de 95 com 2 casas decimais
        expect(historico.getCompras()[0].total).toBeCloseTo(95, 2); // Corrigido para o novo total esperado
        // Verifica se a lista de itens da primeira compra possui pelo menos um item
        expect(historico.getCompras()[0].itens.length).toBeGreaterThan(0);
    });

    // Teste para verificar a aplicação de um cupom de desconto
    test('Aplicar cupom de desconto', () => {
        // Cria uma instância do SistemaCupons para gerenciar cupons
        const sistemaCupons = new SistemaCupons();
        // Adiciona um cupom "BLACKFRIDAY" com 10% de desconto ao sistema
        sistemaCupons.adicionarCupom("BLACKFRIDAY", 10); // 10% de desconto
        
        // Aplica o cupom "BLACKFRIDAY" em um total de 75 e armazena o valor com desconto
        const totalComDesconto = sistemaCupons.aplicarCupom("BLACKFRIDAY", 75);
        // Verifica se o total com desconto está próximo de 67.50 com 2 casas decimais
        expect(totalComDesconto).toBeCloseTo(67.50, 2); // Usamos toBeCloseTo para comparar números de ponto flutuante
    });

    // Espaço para adicionar mais testes conforme necessário para outras funcionalidades
});
