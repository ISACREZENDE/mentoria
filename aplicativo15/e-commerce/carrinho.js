class Carrinho {
    constructor() {
        this.itens = []; // Array para armazenar itens no carrinho
    }

    // Adiciona um produto ao carrinho
    adicionarItem(produto, quantidade) {
        const itemExistente = this.itens.find(item => item.produto.id === produto.id);
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            this.itens.push({ produto, quantidade });
        }
    }

    // Calcula o total do carrinho
    calcularTotal() {
        return this.itens.reduce((total, item) => {
            if (item.produto && typeof item.produto.preco === 'number') {
                return total + (item.produto.preco * item.quantidade);
            }
            return total;
        }, 0);
    }

    // Limpa o carrinho (para realizar o checkout)
    realizarCheckout() {
        const total = this.calcularTotal();
        const itensCheckout = [...this.itens]; // Cria uma cópia dos itens
        this.itens = [];
        console.log(`Checkout realizado. Total: R$${total.toFixed(2)}`);
        return { total, itens: itensCheckout };
    }
}

module.exports = Carrinho;