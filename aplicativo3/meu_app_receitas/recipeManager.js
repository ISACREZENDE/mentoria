const RecipeManager = (() => {
    let recipes = [];
    let favoriteRecipes = new Set();

    const addRecipe = (recipe) => {
        if (!recipe.name || !recipe.ingredients || !recipe.category || !recipe.servings) {
            throw new Error("Todos os campos (name, ingredients, category, servings) são obrigatórios!");
        }
        recipes.push(recipe);
    };

    const searchRecipes = (query) => {
        return recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(query.toLowerCase()) ||
            recipe.category.toLowerCase().includes(query.toLowerCase()) ||
            recipe.ingredients.some(ing => ing.name.toLowerCase().includes(query.toLowerCase())) // 🔹 Correção aqui!
        );
    };

    const addFavorite = (name) => {
        const recipe = recipes.find(r => r.name.toLowerCase() === name.toLowerCase());
        if (!recipe) throw new Error("Receita não encontrada!");
        favoriteRecipes.add(recipe.name);
    };

    const getFavorites = () => {
        return recipes.filter(recipe => favoriteRecipes.has(recipe.name));
    };

    const removeRecipe = (name) => {
        recipes = recipes.filter(recipe => recipe.name.toLowerCase() !== name.toLowerCase());
        favoriteRecipes.delete(name);
    };

    const removeFavorite = (name) => {
        if (!favoriteRecipes.has(name)) throw new Error("Receita não está nos favoritos!");
        favoriteRecipes.delete(name);
    };

    const adjustServings = (name, newServings) => {
        const recipe = recipes.find(r => r.name.toLowerCase() === name.toLowerCase());
        if (!recipe) throw new Error("Receita não encontrada!");

        const factor = newServings / recipe.servings;
        recipe.ingredients = recipe.ingredients.map(ing => ({
            name: ing.name,
            amount: (ing.amount * factor).toFixed(2) + " " + ing.unit
        }));

        recipe.servings = newServings;
        return recipe;
    };

    const convertMeasurement = (amount, unit) => {
        const conversionTable = {
            "g": { "cup": 0.004, "tbsp": 0.067, "tsp": 0.2 },
            "ml": { "cup": 0.004, "tbsp": 0.067, "tsp": 0.2 }
        };

        if (!conversionTable[unit]) throw new Error("Unidade não suportada!");

        let conversions = {};
        for (let newUnit in conversionTable[unit]) {
            conversions[newUnit] = (amount * conversionTable[unit][newUnit]).toFixed(2);
        }

        return conversions;
    };

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

module.exports = RecipeManager;
