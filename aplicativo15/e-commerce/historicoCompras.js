// Define a classe HistoricoCompras para gerenciar o histórico de compras
class HistoricoCompras {
    // Construtor da classe
    constructor() {
        // Inicializa a propriedade 'compras' como um array vazio
        this.compras = [];
    }

    // Método para adicionar um pedido ao histórico de compras
    adicionarPedido(total, itens) {
        // Adiciona um objeto contendo o total e os itens do pedido ao array 'compras'
        this.compras.push({ total, itens });
    }

    // Método para exibir o histórico de compras no console
    mostrarHistorico() {
        // Imprime no console a mensagem "Histórico de Compras:" seguida do array de compras
        console.log("Histórico de Compras:", this.compras);
    }

    // Método para remover uma compra do histórico, baseado no índice fornecido
    removerCompra(index) {
        // Verifica se o índice é válido (maior ou igual a 0 e menor que o tamanho do array 'compras')
        if (index >= 0 && index < this.compras.length) {
            // Remove 1 elemento do array 'compras' a partir do índice informado
            this.compras.splice(index, 1);
        }
    }

    // Método para obter todas as compras registradas
    getCompras() {
        // Retorna o array de compras
        return this.compras;
    }

    // Método para obter a quantidade total de compras registradas
    getTotalCompras() {
        // Retorna o tamanho do array 'compras', representando o número de compras
        return this.compras.length;
    }

    // Método para calcular o valor total de todas as compras registradas
    calcularTotal() {
        // Utiliza o método reduce para somar os valores totais de cada compra no array 'compras'
        return this.compras.reduce((total, compra) => {
            // Verifica se a compra possui um valor 'total' definido
            if (compra.total) {
                // Acumula o valor da compra ao total acumulado
                return total + compra.total;
            }
            // Se não houver um valor 'total', mantém o acumulador inalterado
            return total;
        }, 0); // Inicializa o acumulador com 0
    }
}

// Exporta a classe HistoricoCompras para que possa ser utilizada em outros módulos
module.exports = HistoricoCompras;
