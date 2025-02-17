const usuarios = [];

// Função para adicionar um novo usuário
function adicionarUsuario(nome, email, preferenciaCulinaria) {
    const usuario = { id: usuarios.length + 1, nome, email, preferenciaCulinaria, historicoReservas: [] };
    usuarios.push(usuario);
    return usuario;
}

// Função para recomendar restaurantes com base nas preferências do usuário
function recomendarRestaurantes(usuario) {
    return restaurantes.filter(r => r.tipoCozinha === usuario.preferenciaCulinaria);
}

module.exports = { usuarios, adicionarUsuario, recomendarRestaurantes };
