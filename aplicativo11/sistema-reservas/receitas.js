const receitas = [
    { nome: "Macarrão ao Molho Branco", ingredientes: ["macarrão", "creme de leite", "queijo"] },
    { nome: "Salmão Grelhado", ingredientes: ["salmão", "azeite", "limão"] }
];

// Função para buscar receitas com base nos ingredientes disponíveis
function buscarReceitas(ingredientesUsuario) {
    return receitas.filter(receita =>
        receita.ingredientes.every(ingrediente => ingredientesUsuario.includes(ingrediente))
    );
}

module.exports = { receitas, buscarReceitas };

