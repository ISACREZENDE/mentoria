// Define a classe Produto para representar um produto com atributos e avaliações
class Produto {
    // Construtor da classe que inicializa os atributos do produto
    constructor(nome, preco, categoria) {
        // Gera um ID único para o produto usando Math.random e converte para string em base 36
        this.id = Math.random().toString(36).substr(2, 9); // ou outro método para gerar um ID único
        // Atribui o nome do produto recebido como parâmetro
        this.nome = nome;
        // Atribui o preço do produto recebido como parâmetro
        this.preco = preco;
        // Atribui a categoria do produto recebido como parâmetro
        this.categoria = categoria;
        // Inicializa o array de avaliações como vazio para armazenar as avaliações do produto
        this.avaliacoes = [];
    }

    // Método para adicionar uma avaliação ao produto
    adicionarAvaliacao(nota, comentario) {
        // Adiciona um objeto contendo a nota e o comentário ao array de avaliações
        this.avaliacoes.push({ nota, comentario });
    }
}

// Exporta a classe Produto para que ela possa ser utilizada em outros módulos
module.exports = Produto;
