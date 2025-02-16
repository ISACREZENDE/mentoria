// Importando o pacote 'marked' para converter Markdown em HTML
const { marked } = require('marked');

// Classe principal do aplicativo de notas
class AplicativoDeNotas {
  constructor() {
    this.notas = []; // Array para armazenar as notas
  }

  // Função para criar uma nova nota
  criarNota(titulo, conteudo, tags = []) {
    const novaNota = {
      id: Date.now(), // Usa o timestamp como ID único
      titulo,
      conteudo,
      tags,
    };
    this.notas.push(novaNota); // Adiciona a nota ao array
    return novaNota;
  }

  // Função para editar uma nota existente
  editarNota(id, novoConteudo, novasTags = []) {
    const nota = this.notas.find((nota) => nota.id === id); // Encontra a nota pelo ID
    if (nota) {
      nota.conteudo = novoConteudo; // Atualiza o conteúdo
      nota.tags = novasTags; // Atualiza as tags
      return nota;
    }
    return null; // Retorna null se a nota não for encontrada
  }

  // Função para excluir uma nota
  excluirNota(id) {
    this.notas = this.notas.filter((nota) => nota.id !== id); // Remove a nota do array
  }

  // Função para buscar notas por palavra-chave
  buscarNotas(palavraChave) {
    return this.notas.filter(
      (nota) =>
        nota.titulo.toLowerCase().includes(palavraChave.toLowerCase()) || // Busca no título
        nota.conteudo.toLowerCase().includes(palavraChave.toLowerCase()) || // Busca no conteúdo
        nota.tags.some((tag) => tag.toLowerCase().includes(palavraChave.toLowerCase())) // Busca nas tags
    );
  }

  // Função para visualizar uma nota formatada em HTML
  visualizarNotaFormatada(id) {
    const nota = this.notas.find((nota) => nota.id === id); // Encontra a nota pelo ID
    if (nota) {
      return marked(nota.conteudo); // Converte o Markdown em HTML
    }
    return null; // Retorna null se a nota não for encontrada
  }
}

// Exporta a classe para uso em outros arquivos
module.exports = AplicativoDeNotas;