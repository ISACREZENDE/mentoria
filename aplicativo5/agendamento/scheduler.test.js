// scheduler.test.js - Arquivo de testes

const assert = require('assert');
const AppointmentScheduler = require('./scheduler');

// Criando uma instância do agendador
const scheduler = new AppointmentScheduler();

// Teste de cadastro de usuários
const patient = scheduler.addUser ("João", "paciente");
const professional = scheduler.addUser ("Dra. Maria", "profissional");
assert.strictEqual(patient.name, "João");
assert.strictEqual(professional.role, "profissional");

// Teste de erro ao cadastrar usuário sem nome
try {
    scheduler.addUser ("", "paciente");
} catch (error) {
    assert.strictEqual(error.message, "Nome e função são obrigatórios.");
}

// Teste de agendamento de consulta
const appointment = scheduler.scheduleAppointment(patient.id, professional.id, "2025-02-20 10:00");
assert.strictEqual(appointment.patient.name, "João");
assert.strictEqual(appointment.professional.name, "Dra. Maria");

// Teste de erro ao agendar consulta com paciente inexistente
try {
    scheduler.scheduleAppointment("inexistente", professional.id, "2025-02-20 10:00");
} catch (error) {
    assert.strictEqual(error.message, "Paciente não encontrado.");
}

// Teste de listagem de consultas
const appointments = scheduler.listAppointments();
assert.strictEqual(appointments.length, 1);

console.log("✅ Todos os testes passaram com sucesso!");