// Simulação de um banco de dados em memória
let users = [];
let appointments = [];

// Função para mostrar mensagens
function showMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    setTimeout(() => {
        messageDiv.textContent = '';
    }, 3000); // Limpa a mensagem após 3 segundos
}

// Função para registrar um usuário
function registerUser () {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!name || !email || !password) {
        showMessage("Por favor, preencha todos os campos.");
        return;
    }

    const user = { name, email, password };
    users.push(user);
    showMessage("Usuário cadastrado com sucesso!");
    clearForm();
}

// Função para fazer login
function loginUser () {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        showMessage("Login bem-sucedido!");
        document.getElementById('appointment-form').style.display = 'block';
    } else {
        showMessage("Email ou senha incorretos.");
    }
}

// Função para agendar uma consulta
function scheduleAppointment() {
    const date = document.getElementById('appointment-date').value;

    if (!date) {
        showMessage("Por favor, selecione uma data e hora.");
        return;
    }

    const appointment = { date };
    appointments.push(appointment);
    showMessage("Consulta agendada com sucesso!");
    document.getElementById('appointment-date').value = ''; // Limpa o campo de data
}

// Função para limpar o formulário
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
}
