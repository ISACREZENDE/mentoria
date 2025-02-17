const readline = require("readline");
const { buscarRestaurantes, avaliarRestaurante } = require("./restaurante");
const { fazerReserva, cancelarReserva, alterarReserva } = require("./reserva");
const { adicionarUsuario, recomendarRestaurantes } = require("./usuario");
const { enviarNotificacao } = require("./notificacao");
const { buscarReceitas } = require("./receitas");

// Criando interface para entrada de dados no terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função principal do menu
function menu() {
    console.log("\n📌 Bem-vindo ao Sistema de Reservas de Restaurantes!");
    console.log("1️⃣ Buscar restaurantes");
    console.log("2️⃣ Fazer reserva");
    console.log("3️⃣ Cancelar reserva");
    console.log("4️⃣ Avaliar restaurante");
    console.log("5️⃣ Receber recomendações");
    console.log("6️⃣ Buscar receitas");
    console.log("7️⃣ Sair");

    rl.question("\nEscolha uma opção: ", (opcao) => {
        switch (opcao) {
            case "1":
                rl.question("Digite a localização ou tipo de cozinha: ", (filtro) => {
                    console.log("🔍 Restaurantes encontrados:", buscarRestaurantes(filtro));
                    menu();
                });
                break;

            case "2":
                rl.question("Seu nome: ", (nome) => {
                    rl.question("ID do restaurante: ", (idRestaurante) => {
                        rl.question("Data da reserva (YYYY-MM-DD): ", (data) => {
                            rl.question("Horário da reserva (HH:MM): ", (horario) => {
                                rl.question("Número de pessoas: ", (pessoas) => {
                                    const reserva = fazerReserva(Number(idRestaurante), nome, data, horario, Number(pessoas));
                                    console.log("✅ Reserva feita:", reserva);
                                    enviarNotificacao(nome, "Sua reserva foi confirmada!");
                                    menu();
                                });
                            });
                        });
                    });
                });
                break;

            case "3":
                rl.question("ID da reserva a cancelar: ", (idReserva) => {
                    cancelarReserva(Number(idReserva));
                    console.log("❌ Reserva cancelada.");
                    menu();
                });
                break;

            case "4":
                rl.question("Seu nome: ", (nome) => {
                    rl.question("ID do restaurante: ", (idRestaurante) => {
                        rl.question("Nota (1 a 5): ", (nota) => {
                            rl.question("Comentário: ", (comentario) => {
                                avaliarRestaurante(Number(idRestaurante), nome, Number(nota), comentario);
                                console.log("⭐ Avaliação registrada.");
                                menu();
                            });
                        });
                    });
                });
                break;

            case "5":
                rl.question("Seu nome: ", (nome) => {
                    const usuario = adicionarUsuario(nome, "email@email.com", "Japonesa"); // Apenas um exemplo
                    console.log("🎯 Restaurantes recomendados:", recomendarRestaurantes(usuario));
                    menu();
                });
                break;

            case "6":
                rl.question("Digite os ingredientes disponíveis (separados por vírgula): ", (entrada) => {
                    const ingredientes = entrada.split(",").map(i => i.trim());
                    console.log("🍽️ Receitas sugeridas:", buscarReceitas(ingredientes));
                    menu();
                });
                break;

            case "7":
                console.log("👋 Saindo do sistema. Até mais!");
                rl.close();
                break;

            default:
                console.log("⚠️ Opção inválida! Tente novamente.");
                menu();
        }
    });
}

// Iniciar o menu
menu();
