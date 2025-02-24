// Classe principal que gerencia as tarefas
class GerenciadorTarefas {
    constructor() {
        // Inicializa uma lista vazia de tarefas e um contador de IDs
        this.tarefas = [];
        this.contadorId = 1; // Contador incremental para IDs únicos
    }

    // Método para adicionar uma nova tarefa
    adicionarTarefa(titulo, categoria, lembrete = null) {
        // Validação dos parâmetros
        if (!titulo || !categoria) {
            throw new Error("Título e categoria são obrigatórios.");
        }

        const tarefa = {
            id: this.contadorId++, // Gera um ID único e incrementa o contador
            titulo, // Título da tarefa
            categoria, // Categoria da tarefa (ex: trabalho, pessoal, estudos)
            concluida: false, // Tarefa começa como não concluída
            lembrete, // Lembrete (opcional)
        };
        this.tarefas.push(tarefa); // Adiciona a tarefa à lista
        return tarefa; // Retorna a tarefa criada
    }

    // Método para marcar uma tarefa como concluída
    concluirTarefa(idTarefa) {
        const tarefa = this.tarefas.find((t) => t.id === idTarefa); // Encontra a tarefa pelo ID
        if (tarefa) {
            tarefa.concluida = true; // Marca como concluída
            return tarefa;
        }
        throw new Error(`Tarefa com ID ${idTarefa} não encontrada.`); // Lança um erro se a tarefa não existir
    }

    // Método para listar todas as tarefas
    listarTarefas() {
        return this.tarefas;
    }

    // Método para listar tarefas por categoria
    listarTarefasPorCategoria(categoria) {
        if (!categoria) {
            throw new Error("Categoria é obrigatória.");
        }
        return this.tarefas.filter((tarefa) => tarefa.categoria === categoria);
    }

    // Método para remover uma tarefa
    removerTarefa(idTarefa) {
        const tamanhoInicial = this.tarefas.length; // Armazena o tamanho inicial da lista
        this.tarefas = this.tarefas.filter((tarefa) => tarefa.id !== idTarefa); // Filtra e remove a tarefa
        if (this.tarefas.length === tamanhoInicial) {
            throw new Error(`Tarefa com ID ${idTarefa} não encontrada.`); // Lança um erro se a tarefa não existir
        }
        return true; // Retorna true para indicar sucesso
    }
}

// Exporta a classe para ser usada em outros arquivos
module.exports = GerenciadorTarefas;