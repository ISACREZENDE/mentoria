const RecipeManager = require("./recipeManager");

try {
    console.log("🔹 Teste 1: Adicionando receitas...");
    RecipeManager.addRecipe({
        name: "Bolo de Chocolate",
        ingredients: [
            { name: "farinha", amount: 200, unit: "g" },
            { name: "açúcar", amount: 150, unit: "g" },
            { name: "ovos", amount: 2, unit: "unidade" },
            { name: "chocolate", amount: 100, unit: "g" }
        ],
        category: "doce",
        servings: 4
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

    console.log("\n🔹 Teste 2: Buscando receitas com 'chocolate'...");
    console.log(JSON.stringify(RecipeManager.searchRecipes("chocolate"), null, 2)); // 🔹 Melhor exibição

    console.log("\n🔹 Teste 3: Favoritando receita 'Bolo de Chocolate'...");
    RecipeManager.addFavorite("Bolo de Chocolate");

    console.log("\n🔹 Teste 4: Listando receitas favoritas...");
    console.log(JSON.stringify(RecipeManager.getFavorites(), null, 2)); // 🔹 Melhor exibição

    console.log("\n🔹 Teste 5: Ajustando porções do 'Bolo de Chocolate' para 8...");
    console.log(JSON.stringify(RecipeManager.adjustServings("Bolo de Chocolate", 8), null, 2)); // 🔹 Melhor exibição

    console.log("\n🔹 Teste 6: Convertendo 200g para outras unidades...");
    console.log(RecipeManager.convertMeasurement(200, "g"));

    console.log("\n🔹 Teste 7: Removendo receita 'Salada Caesar'...");
    RecipeManager.removeRecipe("Salada Caesar");

    console.log("\n🔹 Teste 8: Tentando buscar 'Salada Caesar' após remoção...");
    console.log(RecipeManager.searchRecipes("Salada Caesar"));

    console.log("\n🔹 Teste 9: Removendo 'Bolo de Chocolate' dos favoritos...");
    RecipeManager.removeFavorite("Bolo de Chocolate");

    console.log("\n✅ Todos os testes passaram!");
} catch (error) {
    console.error("❌ Erro:", error.message);
}
