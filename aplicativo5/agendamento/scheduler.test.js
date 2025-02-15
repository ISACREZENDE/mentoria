// scheduler.test.js - Arquivo de testes

const assert = require('assert');
const AppointmentScheduler = require('./scheduler');

// Criando uma instância do agendador
const scheduler = new AppointmentScheduler();

// Teste de cadastro de usuários
const patient = scheduler.addUser("João", "paciente");
const professional = scheduler.addUser("Dra. Maria", "profissional");
assert.strictEqual(patient.name, "João");
assert.strictEqual(professional.role, "profissional");

// Teste de agendamento de consulta
const appointment = scheduler.scheduleAppointment(patient.id, professional.id, "2025-02-20 10:00");
assert.strictEqual(appointment.patient.name, "João");
assert.strictEqual(appointment.professional.name, "Dra. Maria");

// Teste de listagem de consultas
const appointments = scheduler.listAppointments();
assert.strictEqual(appointments.length, 1);

console.log("✅ Todos os testes passaram com sucesso!");
