// Importa o módulo `RecipeManager` do arquivo `recipeManager.js`.
const RecipeManager = require("./recipeManager");

try {
    // 🔹 Teste 1: Adicionando receitas ao sistema.
    console.log("🔹 Teste 1: Adicionando receitas...");
    RecipeManager.addRecipe({
        name: "Bolo de Chocolate", // Nome da receita.
        ingredients: [ // Lista de ingredientes com nome, quantidade e unidade.
            { name: "farinha", amount: 200, unit: "g" },
            { name: "açúcar", amount: 150, unit: "g" },
            { name: "ovos", amount: 2, unit: "unidade" },
            { name: "chocolate", amount: 100, unit: "g" }
        ],
        category: "doce", // Categoria da receita.
        servings: 4 // Número de porções.
    });
    RecipeManager.addRecipe({
        name: "Salada Caesar",
        ingredients: [
            { name: "alface", amount: 100, unit: "g" },
            { name: "croutons", amount: 50, unit: "g" },
            { name: "frango", amount: 150, unit: "g" },
            { name: "queijo parmesão", amount: 30, unit: "g" }
        ],
        category: "salgada",
        servings: 2
    });
    console.log("✅ Receitas adicionadas com sucesso!");

    // 🔹 Teste 2: Buscando receitas que contenham a palavra "chocolate".
    console.log("\n🔹 Teste 2: Buscando receitas com 'chocolate'...");
    console.log(JSON.stringify(RecipeManager.searchRecipes("chocolate"), null, 2)); // Exibe os resultados formatados.

    // 🔹 Teste 3: Favoritando a receita "Bolo de Chocolate".
    console.log("\n🔹 Teste 3: Favoritando receita 'Bolo de Chocolate'...");
    RecipeManager.addFavorite("Bolo de Chocolate");

    // 🔹 Teste 4: Listando todas as receitas favoritas.
    console.log("\n🔹 Teste 4: Listando receitas favoritas...");
    console.log(JSON.stringify(RecipeManager.getFavorites(), null, 2)); // Exibe os favoritos formatados.

    // 🔹 Teste 5: Ajustando o número de porções do "Bolo de Chocolate" para 8.
    console.log("\n🔹 Teste 5: Ajustando porções do 'Bolo de Chocolate' para 8...");
    console.log(JSON.stringify(RecipeManager.adjustServings("Bolo de Chocolate", 8), null, 2)); // Exibe a receita ajustada.

    // 🔹 Teste 6: Convertendo 200 gramas para outras unidades (ex.: xícaras, colheres).
    console.log("\n🔹 Teste 6: Convertendo 200g para outras unidades...");
    console.log(RecipeManager.convertMeasurement(200, "g")); // Exibe as conversões.

    // 🔹 Teste 7: Removendo a receita "Salada Caesar" do sistema.
    console.log("\n🔹 Teste 7: Removendo receita 'Salada Caesar'...");
    RecipeManager.removeRecipe("Salada Caesar");

    // 🔹 Teste 8: Tentando buscar a receita "Salada Caesar" após sua remoção.
    console.log("\n🔹 Teste 8: Tentando buscar 'Salada Caesar' após remoção...");
    console.log(RecipeManager.searchRecipes("Salada Caesar")); // Deve retornar um array vazio.

    // 🔹 Teste 9: Removendo "Bolo de Chocolate" dos favoritos.
    console.log("\n🔹 Teste 9: Removendo 'Bolo de Chocolate' dos favoritos...");
    RecipeManager.removeFavorite("Bolo de Chocolate");

    // Finaliza os testes com sucesso.
    console.log("\n✅ Todos os testes passaram!");
} catch (error) {
    // Captura qualquer erro ocorrido durante os testes e exibe a mensagem.
    console.error("❌ Erro:", error.message);
}