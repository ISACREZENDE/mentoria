const { buscarRestaurantes, avaliarRestaurante } = require("./restaurante");
const { fazerReserva, cancelarReserva } = require("./reserva");
const { adicionarUsuario, recomendarRestaurantes } = require("./usuario");
const { enviarNotificacao } = require("./notificacao");
const { buscarReceitas } = require("./receitas");

// Criando um usuário
const usuario1 = adicionarUsuario("Carlos", "carlos@email.com", "Japonesa");

// Buscando restaurantes
console.log("🔍 Restaurantes na Zona Sul:", buscarRestaurantes("Zona Sul"));

// Fazendo uma reserva
const reserva1 = fazerReserva(2, usuario1.nome, "2025-03-10", "19:00", 2);
console.log("✅ Reserva realizada:", reserva1);

// Enviando notificação de confirmação
enviarNotificacao(usuario1.nome, "Sua reserva foi confirmada!");

// Avaliando um restaurante
avaliarRestaurante(2, usuario1.nome, 5, "Ótima comida e atendimento!");
console.log("⭐ Avaliação feita!");

// Buscando recomendações para o usuário
console.log("🎯 Restaurantes recomendados:", recomendarRestaurantes(usuario1));

// Cancelando uma reserva
cancelarReserva(reserva1.id);
console.log("❌ Reserva cancelada:", reserva1);

// Buscando receitas
console.log("🍽️ Receitas sugeridas:", buscarReceitas(["macarrão", "creme de leite"]));
