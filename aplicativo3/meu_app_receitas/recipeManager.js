const RecipeManager = (() => {
    // 🔹 Declaração de uma variável privada `recipes` que armazenará todas as receitas.
    let recipes = [];
    
    // 🔹 Declaração de um Set privado `favoriteRecipes` para armazenar os nomes das receitas favoritas.
    let favoriteRecipes = new Set();

    // 🔹 Função para adicionar uma nova receita ao array `recipes`.
    const addRecipe = (recipe) => {
        // Verifica se todos os campos obrigatórios estão presentes na receita.
        if (!recipe.name || !recipe.ingredients || !recipe.category || !recipe.servings) {
            throw new Error("Todos os campos (name, ingredients, category, servings) são obrigatórios!");
        }
        // Adiciona a receita ao array `recipes`.
        recipes.push(recipe);
    };

    // 🔹 Função para buscar receitas com base em uma consulta de texto.
    const searchRecipes = (query) => {
        return recipes.filter(recipe =>
            // Verifica se o nome da receita contém a consulta (case-insensitive).
            recipe.name.toLowerCase().includes(query.toLowerCase()) ||
            // Verifica se a categoria da receita contém a consulta (case-insensitive).
            recipe.category.toLowerCase().includes(query.toLowerCase()) ||
            // Verifica se algum ingrediente da receita contém a consulta (case-insensitive).
            recipe.ingredients.some(ing => ing.name.toLowerCase().includes(query.toLowerCase()))
        );
    };

    // 🔹 Função para adicionar uma receita aos favoritos.
    const addFavorite = (name) => {
        // Procura a receita pelo nome (case-insensitive).
        const recipe = recipes.find(r => r.name.toLowerCase() === name.toLowerCase());
        // Se a receita não for encontrada, lança um erro.
        if (!recipe) throw new Error("Receita não encontrada!");
        // Adiciona o nome da receita ao Set `favoriteRecipes`.
        favoriteRecipes.add(recipe.name);
    };

    // 🔹 Função para obter todas as receitas favoritas.
    const getFavorites = () => {
        // Filtra as receitas que estão no Set `favoriteRecipes`.
        return recipes.filter(recipe => favoriteRecipes.has(recipe.name));
    };

    // 🔹 Função para remover uma receita pelo nome.
    const removeRecipe = (name) => {
        // Remove a receita do array `recipes` filtrando por nome (case-insensitive).
        recipes = recipes.filter(recipe => recipe.name.toLowerCase() !== name.toLowerCase());
        // Remove a receita dos favoritos, caso esteja lá.
        favoriteRecipes.delete(name);
    };

    // 🔹 Função para remover uma receita dos favoritos.
    const removeFavorite = (name) => {
        // Verifica se a receita está nos favoritos. Se não estiver, lança um erro.
        if (!favoriteRecipes.has(name)) throw new Error("Receita não está nos favoritos!");
        // Remove a receita do Set `favoriteRecipes`.
        favoriteRecipes.delete(name);
    };

    // 🔹 Função para ajustar o número de porções de uma receita.
    const adjustServings = (name, newServings) => {
        // Procura a receita pelo nome (case-insensitive).
        const recipe = recipes.find(r => r.name.toLowerCase() === name.toLowerCase());
        // Se a receita não for encontrada, lança um erro.
        if (!recipe) throw new Error("Receita não encontrada!");
        // Calcula o fator de ajuste para as novas porções.
        const factor = newServings / recipe.servings;
        // Atualiza a quantidade de cada ingrediente multiplicando pelo fator de ajuste.
        recipe.ingredients = recipe.ingredients.map(ing => ({
            name: ing.name,
            amount: (ing.amount * factor).toFixed(2) + " " + ing.unit
        }));
        // Atualiza o número de porções da receita.
        recipe.servings = newServings;
        // Retorna a receita atualizada.
        return recipe;
    };

    // 🔹 Função para converter medidas de ingredientes (ex.: gramas para xícaras).
    const convertMeasurement = (amount, unit) => {
        // Tabela de conversão para diferentes unidades.
        const conversionTable = {
            "g": { "cup": 0.004, "tbsp": 0.067, "tsp": 0.2 },
            "ml": { "cup": 0.004, "tbsp": 0.067, "tsp": 0.2 }
        };
        // Se a unidade não estiver na tabela de conversão, lança um erro.
        if (!conversionTable[unit]) throw new Error("Unidade não suportada!");
        // Objeto para armazenar as conversões.
        let conversions = {};
        // Itera sobre as unidades de conversão disponíveis e calcula o valor convertido.
        for (let newUnit in conversionTable[unit]) {
            conversions[newUnit] = (amount * conversionTable[unit][newUnit]).toFixed(2);
        }
        // Retorna o objeto com as conversões.
        return conversions;
    };

    // 🔹 Retorna um objeto público com as funções que podem ser acessadas externamente.
    return {
        addRecipe,
        searchRecipes,
        addFavorite,
        getFavorites,
        removeRecipe,
        removeFavorite,
        adjustServings,
        convertMeasurement
    };
})();

// Exporta o módulo `RecipeManager` para ser usado em outros arquivos.
module.exports = RecipeManager;