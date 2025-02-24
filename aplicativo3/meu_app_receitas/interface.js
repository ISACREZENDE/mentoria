// Importa o módulo RecipeManager, que contém as funções para gerenciar receitas.
const RecipeManager = require("./recipeManager");

// Função principal para iniciar a interface interativa com o usuário.
const startInterface = async () => {
    // Cria uma interface de leitura/escrita para interagir com o usuário no terminal.
    const readline = require("readline").createInterface({
        input: process.stdin,  // Lê entrada do teclado.
        output: process.stdout // Escreve saída no terminal.
    });

    // Função auxiliar para fazer perguntas ao usuário e retornar a resposta como uma Promise.
    const askQuestion = (question) => {
        return new Promise((resolve) => {
            // Exibe a pergunta e aguarda a resposta do usuário.
            readline.question(question, (answer) => resolve(answer));
        });
    };

    // Mensagem de boas-vindas ao usuário.
    console.log("🎉 Bem-vindo ao Gerenciador de Receitas! 🎉");

    // Variável para controlar se o programa está em execução.
    let running = true;

    // Loop principal do menu. Enquanto `running` for verdadeiro, o menu será exibido.
    while (running) {
        console.log("\n------------------- MENU -------------------");
        console.log("1. Adicionar uma nova receita");
        console.log("2. Buscar receitas");
        console.log("3. Favoritar uma receita");
        console.log("4. Listar receitas favoritas");
        console.log("5. Ajustar porções de uma receita");
        console.log("6. Remover uma receita");
        console.log("7. Sair");
        console.log("--------------------------------------------");

        // Pergunta ao usuário qual opção ele deseja escolher.
        const choice = await askQuestion("Escolha uma opção (1-7): ");

        // Executa a ação correspondente à escolha do usuário.
        switch (choice.trim()) {
            case "1":
                await addNewRecipe(askQuestion); // Chama a função para adicionar uma nova receita.
                break;
            case "2":
                await searchRecipes(askQuestion); // Chama a função para buscar receitas.
                break;
            case "3":
                await addFavoriteRecipe(askQuestion); // Chama a função para favoritar uma receita.
                break;
            case "4":
                listFavoriteRecipes(); // Chama a função para listar receitas favoritas.
                break;
            case "5":
                await adjustRecipeServings(askQuestion); // Chama a função para ajustar porções.
                break;
            case "6":
                await removeRecipe(askQuestion); // Chama a função para remover uma receita.
                break;
            case "7":
                console.log("👋 Até logo! Obrigado por usar o Gerenciador de Receitas!");
                running = false; // Encerra o loop e finaliza o programa.
                readline.close(); // Fecha a interface de leitura/escrita.
                break;
            default:
                console.log("⚠️ Opção inválida! Por favor, escolha uma opção entre 1 e 7.");
        }
    }
};

// Função para adicionar uma nova receita.
const addNewRecipe = async (askQuestion) => {
    try {
        // Pergunta ao usuário o nome da receita.
        const name = await askQuestion("Digite o nome da receita: ");
        // Pergunta ao usuário a categoria da receita.
        const category = await askQuestion("Digite a categoria da receita (ex.: doce/salgada): ");
        // Pergunta ao usuário o número de porções e converte para número inteiro.
        const servings = parseInt(await askQuestion("Digite o número de porções: "), 10);

        // Verifica se os campos obrigatórios estão preenchidos e válidos.
        if (!name || !category || isNaN(servings)) {
            console.log("⚠️ Todos os campos são obrigatórios e devem ser válidos!");
            return;
        }

        // Inicializa um array vazio para armazenar os ingredientes da receita.
        const ingredients = [];
        let addingIngredients = true;

        // Loop para permitir que o usuário adicione vários ingredientes.
        while (addingIngredients) {
            // Pergunta o nome do ingrediente ou permite sair digitando "sair".
            const ingredientName = await askQuestion("Digite o nome do ingrediente (ou 'sair' para finalizar): ");
            if (ingredientName.toLowerCase() === "sair") {
                addingIngredients = false; // Sai do loop se o usuário digitar "sair".
                continue;
            }
            // Pergunta a quantidade do ingrediente e converte para número.
            const amount = parseFloat(await askQuestion("Digite a quantidade do ingrediente: "));
            // Pergunta a unidade de medida do ingrediente.
            const unit = await askQuestion("Digite a unidade de medida (ex.: g, ml, unidade): ");
            // Adiciona o ingrediente ao array de ingredientes.
            ingredients.push({ name: ingredientName, amount, unit });
        }

        // Chama a função `addRecipe` do RecipeManager para adicionar a receita.
        RecipeManager.addRecipe({ name, ingredients, category, servings });
        console.log(`✅ Receita '${name}' adicionada com sucesso!`);
    } catch (error) {
        // Captura e exibe qualquer erro que ocorra durante a adição da receita.
        console.error("❌ Erro ao adicionar receita:", error.message);
    }
};

// Função para buscar receitas.
const searchRecipes = async (askQuestion) => {
    try {
        // Pergunta ao usuário o termo de busca.
        const query = await askQuestion("Digite o termo de busca (nome, categoria ou ingrediente): ");
        // Chama a função `searchRecipes` do RecipeManager para buscar receitas.
        const results = RecipeManager.searchRecipes(query);
        // Verifica se há resultados e exibe-os.
        if (results.length === 0) {
            console.log("🔍 Nenhuma receita encontrada para o termo informado.");
        } else {
            console.log("📋 Resultados da busca:");
            console.log(JSON.stringify(results, null, 2)); // Exibe os resultados formatados.
        }
    } catch (error) {
        // Captura e exibe qualquer erro que ocorra durante a busca.
        console.error("❌ Erro ao buscar receitas:", error.message);
    }
};

// Função para favoritar uma receita.
const addFavoriteRecipe = async (askQuestion) => {
    try {
        // Pergunta ao usuário o nome da receita que deseja favoritar.
        const name = await askQuestion("Digite o nome da receita que deseja favoritar: ");
        // Chama a função `addFavorite` do RecipeManager para favoritar a receita.
        RecipeManager.addFavorite(name);
        console.log(`⭐ Receita '${name}' foi adicionada aos favoritos!`);
    } catch (error) {
        // Captura e exibe qualquer erro que ocorra ao favoritar a receita.
        console.error("❌ Erro ao favoritar receita:", error.message);
    }
};

// Função para listar receitas favoritas.
const listFavoriteRecipes = () => {
    try {
        // Chama a função `getFavorites` do RecipeManager para obter as receitas favoritas.
        const favorites = RecipeManager.getFavorites();
        // Verifica se há receitas favoritas e exibe-as.
        if (favorites.length === 0) {
            console.log("💔 Nenhuma receita favorita encontrada.");
        } else {
            console.log("🌟 Receitas favoritas:");
            console.log(JSON.stringify(favorites, null, 2)); // Exibe as receitas formatadas.
        }
    } catch (error) {
        // Captura e exibe qualquer erro que ocorra ao listar favoritos.
        console.error("❌ Erro ao listar favoritos:", error.message);
    }
};

// Função para ajustar as porções de uma receita.
const adjustRecipeServings = async (askQuestion) => {
    try {
        // Pergunta ao usuário o nome da receita.
        const name = await askQuestion("Digite o nome da receita: ");
        // Pergunta o novo número de porções e converte para número inteiro.
        const newServings = parseInt(await askQuestion("Digite o novo número de porções: "), 10);
        // Verifica se o número de porções é válido.
        if (isNaN(newServings)) {
            console.log("⚠️ O número de porções deve ser um valor numérico válido!");
            return;
        }
        // Chama a função `adjustServings` do RecipeManager para ajustar as porções.
        const updatedRecipe = RecipeManager.adjustServings(name, newServings);
        console.log(`📝 Porções da receita '${name}' ajustadas para ${newServings}:`);
        console.log(JSON.stringify(updatedRecipe, null, 2)); // Exibe a receita atualizada.
    } catch (error) {
        // Captura e exibe qualquer erro que ocorra ao ajustar as porções.
        console.error("❌ Erro ao ajustar porções:", error.message);
    }
};

// Função para remover uma receita.
const removeRecipe = async (askQuestion) => {
    try {
        // Pergunta ao usuário o nome da receita que deseja remover.
        const name = await askQuestion("Digite o nome da receita que deseja remover: ");
        // Chama a função `removeRecipe` do RecipeManager para remover a receita.
        RecipeManager.removeRecipe(name);
        console.log(`🗑️ Receita '${name}' removida com sucesso!`);
    } catch (error) {
        // Captura e exibe qualquer erro que ocorra ao remover a receita.
        console.error("❌ Erro ao remover receita:", error.message);
    }
};

// Inicia a interface interativa.
startInterface();
