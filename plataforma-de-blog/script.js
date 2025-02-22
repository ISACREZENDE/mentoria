// script.js

// Inicialização do objeto PlataformaBlog e do array postagens
window.PlataformaBlog = window.PlataformaBlog || {};
window.PlataformaBlog.postagens = [];

// Função para criar postagem
window.PlataformaBlog.criarPostagem = function (titulo, conteudo, categorias, tags) {
    const novaPostagem = {
        titulo: titulo,
        conteudo: conteudo,
        categorias: categorias,
        tags: tags,
        data: new Date().toLocaleDateString() // Adiciona a data de criação
    };
    window.PlataformaBlog.postagens.push(novaPostagem);
    atualizarListaPostagens();
};

function criarPostagem() {
    try {
        const titulo = document.getElementById('titulo').value;
        const conteudo = document.getElementById('conteudo').value;
        const categorias = document.getElementById('categorias').value.split(',');
        const tags = document.getElementById('tags').value.split(',');

        if (!titulo || !conteudo) {
            throw new Error("Título e conteúdo são obrigatórios.");
        }

        window.PlataformaBlog.criarPostagem(titulo, conteudo, categorias, tags);

        document.getElementById('form-criar-postagem').reset();
        atualizarListaPostagens();

    } catch (error) {
        alert(error.message); // Exibe a mensagem de erro para o usuário
    }
}

function atualizarListaPostagens() {
    const listaPostagens = document.getElementById('lista-postagens');
    listaPostagens.innerHTML = '';

    window.PlataformaBlog.postagens.forEach(postagem => {
        const divPostagem = document.createElement('div');
        divPostagem.classList.add('postagem');

        // Sanitização do conteúdo com DOMPurify
        const sanitizedConteudo = DOMPurify.sanitize(postagem.conteudo);

        divPostagem.innerHTML = `
            <h3>${postagem.titulo}</h3>
            <div class="conteudo">${sanitizedConteudo}</div>
            <div class="categorias">Categorias: ${postagem.categorias.join(', ')}</div>
            <div class="tags">Tags: ${postagem.tags.join(', ')}</div>
            <div class="data">Data: ${postagem.data}</div>
        `;
        listaPostagens.appendChild(divPostagem);
    });
}

window.onload = atualizarListaPostagens;
window.criarPostagem = criarPostagem;