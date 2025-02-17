// Lista de restaurantes com nome, localização, tipo de cozinha, menu e preços
const restaurantes = [
    {
        id: 1,
        nome: "Sabor Italiano",
        localizacao: "Centro",
        tipoCozinha: "Italiana",
        menu: [
            { prato: "Macarrão Carbonara", preco: 45 },
            { prato: "Pizza Margherita", preco: 50 }
        ],
        avaliacoes: []
    },
    {
        id: 2,
        nome: "Sushi House",
        localizacao: "Zona Sul",
        tipoCozinha: "Japonesa",
        menu: [
            { prato: "Sushi Especial", preco: 60 },
            { prato: "Temaki Salmão", preco: 35 }
        ],
        avaliacoes: []
    }
];

// Função para buscar restaurantes por localização ou tipo de cozinha
function buscarRestaurantes(filtro) {
    return restaurantes.filter(restaurante =>
        restaurante.localizacao.includes(filtro) ||
        restaurante.tipoCozinha.includes(filtro)
    );
}

// Função para adicionar uma avaliação ao restaurante
function avaliarRestaurante(idRestaurante, usuario, nota, comentario) {
    const restaurante = restaurantes.find(r => r.id === idRestaurante);
    if (restaurante) {
        restaurante.avaliacoes.push({ usuario, nota, comentario });
    }
}

module.exports = { restaurantes, buscarRestaurantes, avaliarRestaurante };
