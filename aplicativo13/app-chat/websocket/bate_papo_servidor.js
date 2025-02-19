// Importa a biblioteca ws para lidar com WebSockets
const WebSocket = require('ws');

// Cria um novo servidor WebSocket que escuta na porta 8080
const wss = new WebSocket.Server({ port: 8080 });

// Objeto para armazenar as salas e seus usuários
// A chave é o nome da sala e o valor é um array com os usuários (WebSockets)
const salas = {};

// Evento de conexão: quando um novo cliente se conecta ao servidor
wss.on('connection', ws => {
    console.log('Cliente conectado');

    // Evento de mensagem: quando o servidor recebe uma mensagem de um cliente
    ws.on('message', message => {
        try {
            // Tenta analisar a mensagem como JSON
            const data = JSON.parse(message);

            // Verifica o tipo de mensagem e executa a lógica correspondente
            if (data.tipo === 'criarSala') {
                const nomeSala = data.nome;

                // Verifica se a sala já existe
                if (salas[nomeSala]) {
                    // Envia uma mensagem de erro para o cliente
                    ws.send(JSON.stringify({ tipo: 'erro', mensagem: 'Sala já existe' }));
                    return;
                }

                // Cria a sala e adiciona ao objeto salas
                salas[nomeSala] = [];

                // Envia a lista de salas atualizada para todos os clientes
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ tipo: 'listaSalas', salas: Object.keys(salas) }));
                    }
                });
            } else if (data.tipo === 'entrarSala') {
                const nomeSala = data.nome;

                // Adiciona o usuário à sala
                salas[nomeSala].push(ws);
                ws.sala = nomeSala; // Armazena a sala do usuário

                // Envia a confirmação para o cliente
                ws.send(JSON.stringify({ tipo: 'entrarSala', sala: nomeSala }));

                // Envia a lista de usuários da sala para todos os clientes na sala
                salas[nomeSala].forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ tipo: 'listaUsuarios', usuarios: salas[nomeSala].map(user => user.id) }));
                    }
                });
            } else if (data.tipo === 'sairSala') {
                // Lógica para sair da sala (a ser implementada)
            } else if (data.tipo === 'listarSalas') {
                // Lógica para listar salas (a ser implementada)
            } else if (data.tipo === 'enviarMensagem') {
                const mensagem = data.mensagem;
                const remetente = 'NomeDoRemetente'; // Substitua pelo nome real do remetente

                // Envia a mensagem para todos os clientes na sala
                if (ws.sala && salas[ws.sala]) {
                    salas[ws.sala].forEach(client => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({
                                tipo: 'mensagem',
                                mensagem: mensagem,
                                remetente: remetente
                            }));
                        }
                    });
                }
            }
        } catch (error) {
            console.error("Erro ao processar mensagem:", error);
        }
    });

    // Evento de desconexão: quando um cliente se desconecta do servidor
    ws.on('close', () => {
        // Lógica para lidar com a desconexão do cliente (a ser implementada)
    });

    // Gera um ID único para o usuário
    ws.id = generateUniqueId();
});

// Mensagem exibida no console quando o servidor é iniciado
console.log('Servidor WebSocket iniciado na porta 8080');

// Função para gerar IDs únicos (a ser implementada)
function generateUniqueId() {
    // ...
}