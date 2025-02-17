// Cria alguns usuários
const alice = new Usuario("Alice", "alice@example.com", "senha123");
const bob = new Usuario("Bob", "bob@example.com", "senha456");
const carla = new Usuario("Carla", "carla@example.com", "senha789");

// Adiciona amigos e postagens
alice.adicionarAmigo(bob);
alice.seguirUsuario(carla);
alice.postarAtualizacao("Olá, mundo!");
bob.postarAtualizacao("Oi, Alice!");
carla.postarAtualizacao("Oi, pessoal!");

// Função para exibir notificações
function exibirNotificacoes(usuario) {
    const listaNotificacoes = document.getElementById("lista-notificacoes");
    listaNotificacoes.innerHTML = ""; // Limpa a lista de notificações

    usuario.notificacoes.forEach(notificacao => {
        const item = document.createElement("li");
        item.textContent = notificacao;
        listaNotificacoes.appendChild(item);
    });
}

// Função para exibir o feed
function exibirFeed(usuario) {
    const feedElement = document.getElementById("feed");
    feedElement.innerHTML = "<h2>Feed</h2>"; // Limpa o feed

    const feed = usuario.verFeed();
    feed.forEach((postagem, indice) => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `
            <strong>${postagem.autor}</strong>
            <p>${postagem.conteudo}</p>
            <small>Curtidas: ${postagem.curtidas} | Comentários: ${postagem.comentarios.length}</small>
            <button onclick="curtirPostagem(${indice})">Curtir</button>
            <button onclick="comentarPostagem(${indice})">Comentar</button>
        `;
        feedElement.appendChild(postElement);
    });
}

// Função para curtir uma postagem
function curtirPostagem(indice) {
    const postagem = alice.verFeed()[indice];
    const usuario = [alice, bob, carla].find(u => u.nome === postagem.autor);
    alice.curtirPostagem(usuario, usuario.postagens.indexOf(postagem));
    exibirFeed(alice);
    exibirNotificacoes(usuario);
}

// Função para comentar em uma postagem
function comentarPostagem(indice) {
    const postagem = alice.verFeed()[indice];
    const usuario = [alice, bob, carla].find(u => u.nome === postagem.autor);
    const comentario = prompt("Digite seu comentário:");
    if (comentario) {
        alice.comentarPostagem(usuario, usuario.postagens.indexOf(postagem), comentario);
        exibirFeed(alice);
        exibirNotificacoes(usuario);
    }
}

// Exibe o feed e as notificações ao carregar a página
exibirFeed(alice);
exibirNotificacoes(alice);