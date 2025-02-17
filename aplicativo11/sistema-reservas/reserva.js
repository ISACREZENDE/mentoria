const reservas = [];

// Função para fazer uma nova reserva
function fazerReserva(idRestaurante, usuario, data, horario, pessoas) {
    const novaReserva = {
        id: reservas.length + 1,
        restaurante: idRestaurante,
        usuario,
        data,
        horario,
        pessoas,
        status: "Confirmada"
    };
    reservas.push(novaReserva);
    return novaReserva;
}

// Função para cancelar uma reserva
function cancelarReserva(idReserva) {
    const reserva = reservas.find(r => r.id === idReserva);
    if (reserva) {
        reserva.status = "Cancelada";
    }
}

// Função para alterar uma reserva
function alterarReserva(idReserva, novaData, novoHorario) {
    const reserva = reservas.find(r => r.id === idReserva);
    if (reserva && reserva.status !== "Cancelada") {
        reserva.data = novaData;
        reserva.horario = novoHorario;
    }
}

module.exports = { reservas, fazerReserva, cancelarReserva, alterarReserva };
