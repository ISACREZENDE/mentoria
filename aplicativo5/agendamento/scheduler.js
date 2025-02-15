// scheduler.js - Módulo para agendamento de consultas

// Classe principal do agendador de consultas
class AppointmentScheduler {
    constructor() {
        // Lista para armazenar os usuários cadastrados (pacientes e profissionais)
        this.users = [];
        // Lista para armazenar as consultas agendadas
        this.appointments = [];
    }

    // Método para cadastrar um usuário
    addUser(name, role) {
        if (!name || !role) {
            throw new Error("Nome e função são obrigatórios.");
        }
        if (role !== "paciente" && role !== "profissional") {
            throw new Error("Função inválida. Use 'paciente' ou 'profissional'.");
        }
        const user = { id: this.users.length + 1, name, role };
        this.users.push(user);
        return user;
    }

    // Método para agendar uma consulta
    scheduleAppointment(patientId, professionalId, dateTime) {
        if (!patientId || !professionalId || !dateTime) {
            throw new Error("Todos os dados são obrigatórios para agendar uma consulta.");
        }
        // Verifica se os usuários existem e têm os papéis corretos
        const patient = this.users.find(user => user.id === patientId && user.role === "paciente");
        const professional = this.users.find(user => user.id === professionalId && user.role === "profissional");
        if (!patient) {
            throw new Error("Paciente não encontrado.");
        }
        if (!professional) {
            throw new Error("Profissional não encontrado.");
        }
        
        // Criando a consulta
        const appointment = { id: this.appointments.length + 1, patient, professional, dateTime };
        this.appointments.push(appointment);
        return appointment;
    }

    // Método para listar todas as consultas
    listAppointments() {
        return this.appointments;
    }
}

// Exportando o módulo para ser usado em outros arquivos
module.exports = AppointmentScheduler;
