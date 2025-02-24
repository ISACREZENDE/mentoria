// Importa a classe GerenciadorTarefas do arquivo 'gerenciadorTarefas.js'
const GerenciadorTarefas = require('./gerenciadorTarefas');

// Importa o módulo nativo 'readline' do Node.js, usado para interação com o usuário via terminal
const readline = require('readline');

// Cria uma instância da classe GerenciadorTarefas para gerenciar as tarefas
const gerenciadorTarefas = new GerenciadorTarefas();

// Configura o módulo 'readline' para ler entradas do usuário via terminal
const rl = readline.createInterface({
    input: process.stdin,  // Define a entrada como o teclado (stdin)
    output: process.stdout, // Define a saída como o terminal (stdout)
});

// Função para exibir o menu de opções ao usuário
function mostrarMenu() {
    console.log('\n=== GERENCIADOR DE TAREFAS ==='); // Exibe o cabeçalho do menu
    console.log('1. Adicionar tarefa'); // Opção para adicionar uma nova tarefa
    console.log('2. Listar todas as tarefas'); // Opção para listar todas as tarefas
    console.log('3. Listar tarefas por categoria'); // Opção para filtrar tarefas por categoria
    console.log('4. Marcar tarefa como concluída'); // Opção para marcar uma tarefa como concluída
    console.log('5. Remover tarefa'); // Opção para remover uma tarefa
    console.log('6. Sair'); // Opção para sair do programa
    console.log('==============================\n'); // Linha divisória para melhor visualização
}

// Função para processar a escolha do usuário com base na opção selecionada
function processarEscolha(escolha) {
    switch (escolha) { // Verifica qual opção foi escolhida pelo usuário
        case '1': // Se a escolha for '1', chama a função para adicionar uma tarefa
            adicionarTarefa();
            break;
        case '2': // Se a escolha for '2', chama a função para listar todas as tarefas
            listarTodasTarefas();
            break;
        case '3': // Se a escolha for '3', chama a função para listar tarefas por categoria
            listarTarefasPorCategoria();
            break;
        case '4': // Se a escolha for '4', chama a função para marcar uma tarefa como concluída
            marcarTarefaConcluida();
            break;
        case '5': // Se a escolha for '5', chama a função para remover uma tarefa
            removerTarefa();
            break;
        case '6': // Se a escolha for '6', encerra o programa
            console.log('Saindo do programa. Até logo!');
            rl.close(); // Fecha a interface de leitura do terminal
            break;
        default: // Caso a escolha seja inválida, exibe uma mensagem de erro
            console.log('Opção inválida. Tente novamente.');
            iniciarInterface(); // Retorna ao menu principal
    }
}

// Função para iniciar a interface e exibir o menu de opções
function iniciarInterface() {
    mostrarMenu(); // Chama a função para exibir o menu de opções
    rl.question('Escolha uma opção: ', (escolha) => { // Pede ao usuário para escolher uma opção
        processarEscolha(escolha); // Processa a escolha do usuário
    });
}

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    rl.question('Digite o título da tarefa: ', (titulo) => { // Pede ao usuário o título da tarefa
        rl.question('Digite a categoria da tarefa: ', (categoria) => { // Pede ao usuário a categoria da tarefa
            try {
                // Adiciona a tarefa usando o método 'adicionarTarefa' da classe GerenciadorTarefas
                const tarefa = gerenciadorTarefas.adicionarTarefa(titulo, categoria);
                console.log(`Tarefa adicionada com sucesso! ID: ${tarefa.id}`); // Exibe o ID da tarefa criada
            } catch (error) {
                console.error(error.message); // Exibe uma mensagem de erro caso ocorra algum problema
            }
            iniciarInterface(); // Retorna ao menu principal após a operação
        });
    });
}

// Função para listar todas as tarefas cadastradas
function listarTodasTarefas() {
    const tarefas = gerenciadorTarefas.listarTarefas(); // Obtém a lista de todas as tarefas
    if (tarefas.length === 0) { // Verifica se não há tarefas cadastradas
        console.log('Nenhuma tarefa encontrada.'); // Exibe uma mensagem caso não haja tarefas
    } else {
        console.log('Lista de tarefas:'); // Exibe o cabeçalho da lista de tarefas
        tarefas.forEach((tarefa) => { // Itera sobre cada tarefa e exibe seus detalhes
            console.log(
                `ID: ${tarefa.id}, Título: ${tarefa.titulo}, Categoria: ${tarefa.categoria}, Concluída: ${tarefa.concluida}`
            );
        });
    }
    iniciarInterface(); // Retorna ao menu principal após a operação
}

// Função para listar tarefas filtradas por categoria
function listarTarefasPorCategoria() {
    rl.question('Digite a categoria para filtrar: ', (categoria) => { // Pede ao usuário a categoria para filtrar
        try {
            const tarefas = gerenciadorTarefas.listarTarefasPorCategoria(categoria); // Filtra as tarefas pela categoria
            if (tarefas.length === 0) { // Verifica se não há tarefas na categoria informada
                console.log(`Nenhuma tarefa encontrada na categoria "${categoria}".`); // Exibe uma mensagem caso não haja tarefas
            } else {
                console.log(`Tarefas na categoria "${categoria}":`); // Exibe o cabeçalho da lista de tarefas filtradas
                tarefas.forEach((tarefa) => { // Itera sobre cada tarefa e exibe seus detalhes
                    console.log(
                        `ID: ${tarefa.id}, Título: ${tarefa.titulo}, Concluída: ${tarefa.concluida}`
                    );
                });
            }
        } catch (error) {
            console.error(error.message); // Exibe uma mensagem de erro caso ocorra algum problema
        }
        iniciarInterface(); // Retorna ao menu principal após a operação
    });
}

// Função para marcar uma tarefa como concluída
function marcarTarefaConcluida() {
    rl.question('Digite o ID da tarefa a ser concluída: ', (id) => { // Pede ao usuário o ID da tarefa
        try {
            const idTarefa = parseInt(id, 10); // Converte o ID para um número inteiro
            const tarefa = gerenciadorTarefas.concluirTarefa(idTarefa); // Marca a tarefa como concluída
            console.log(`Tarefa "${tarefa.titulo}" marcada como concluída.`); // Exibe uma mensagem de confirmação
        } catch (error) {
            console.error(error.message); // Exibe uma mensagem de erro caso ocorra algum problema
        }
        iniciarInterface(); // Retorna ao menu principal após a operação
    });
}

// Função para remover uma tarefa
function removerTarefa() {
    rl.question('Digite o ID da tarefa a ser removida: ', (id) => { // Pede ao usuário o ID da tarefa
        try {
            const idTarefa = parseInt(id, 10); // Converte o ID para um número inteiro
            gerenciadorTarefas.removerTarefa(idTarefa); // Remove a tarefa com o ID informado
            console.log(`Tarefa com ID ${idTarefa} removida com sucesso.`); // Exibe uma mensagem de confirmação
        } catch (error) {
            console.error(error.message); // Exibe uma mensagem de erro caso ocorra algum problema
        }
        iniciarInterface(); // Retorna ao menu principal após a operação
    });
}

// Inicia a interface ao executar o arquivo
iniciarInterface(); // Chama a função para iniciar a interface e exibir o menu de opções