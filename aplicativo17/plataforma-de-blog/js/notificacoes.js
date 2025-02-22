// notificacoes.js
import PlataformaBlog from './plataforma.js';

function lidarNovaPostagem(postagem) {
  alert(`Nova postagem: ${postagem.titulo}`);
}

function lidarNovoComentario(dados) {
  console.log(`Novo comentário na postagem: ${dados.postagem.titulo}`);
}

PlataformaBlog.notificar = function(evento, dados) {
  if (evento === 'novaPostagem') {
    lidarNovaPostagem(dados);
  } else if (evento === 'novoComentario') {
    lidarNovoComentario(dados);
  }
};