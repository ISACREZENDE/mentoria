// Classe para gerenciar cupons
class SistemaCupons {
    // Construtor da classe que inicializa o array de cupons
    constructor() {
        // Inicializa a propriedade 'cupons' como um array vazio para armazenar os cupons
        this.cupons = []; // Array para armazenar cupons
    }

    // Método para adicionar um cupom ao sistema
    adicionarCupom(codigo, desconto) {
        // Adiciona um objeto contendo o código e o desconto ao array de cupons
        this.cupons.push({ codigo, desconto });
    }

    // Método para aplicar um cupom ao valor total
    aplicarCupom(codigo, total) {
        // Procura um cupom no array que possua o código informado
        const cupom = this.cupons.find(c => c.codigo === codigo);
        // Se o cupom for encontrado, calcula o valor total aplicando o desconto
        if (cupom) {
            return total - (total * (cupom.desconto / 100));
        }
        // Se o cupom não for encontrado, retorna o total sem alterações
        return total; // Retorna o total original se o cupom não for encontrado
    }
}

// Exporta a classe SistemaCupons para que possa ser utilizada em outros módulos
module.exports = SistemaCupons;
