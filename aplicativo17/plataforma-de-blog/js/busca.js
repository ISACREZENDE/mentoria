// busca.js
import PlataformaBlog from './plataforma.js';

function buscar(termo) {
  return PlataformaBlog.buscarPostagens(termo);
}

export { buscar };