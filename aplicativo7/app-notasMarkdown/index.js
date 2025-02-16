const AplicativoDeNotas = require('./app');

// Cria uma instância do aplicativo
const app = new AplicativoDeNotas();

// Cria uma nova nota
const nota1 = app.criarNota('Lista de Compras', '- Maçãs\n- Bananas\n- Leite', ['compras', 'casa']);
console.log('Nota criada:', nota1);

// Edita a nota
app.editarNota(nota1.id, '- Maçãs\n- Bananas\n- Leite\n- Pão', ['compras', 'casa', 'urgente']);
console.log('Nota editada:', app.notas);

// Visualiza a nota formatada em HTML
const html = app.visualizarNotaFormatada(nota1.id);
console.log('Nota formatada em HTML:', html);

// Busca notas por palavra-chave
const notasEncontradas = app.buscarNotas('compras');
console.log('Notas encontradas:', notasEncontradas);

// Exclui a nota
app.excluirNota(nota1.id);
console.log('Nota excluída. Notas restantes:', app.notas);
