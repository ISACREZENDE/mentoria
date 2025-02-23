// Importando o módulo do app.js
const EventoApp = (() => {
    // Array para armazenar os eventos
    let eventos = [];

    // Função para criar um novo evento
    const criarEvento = (nome, data, local) => {
        const evento = {
            id: eventos.length + 1,
            nome: nome,
            data: data,
            local: local,
            rsvps: [],
            comentarios: []
        };
        eventos.push(evento);
        return evento;
    };

    // Função para confirmar presença (RSVP)
    const confirmarRSVP = (eventoId, nomeConvidado) => {
        const evento = eventos.find(e => e.id === eventoId);
        if (evento) {
            evento.rsvps.push(nomeConvidado);
            return true;
        }
        return false;
    };

    // Função para adicionar um comentário ao evento
    const adicionarComentario = (eventoId, comentario) => {
        const evento = eventos.find(e => e.id === eventoId);
        if (evento) {
            evento.comentarios.push(comentario);
            return true;
        }
        return false;
    };

    // Função para enviar convites (simulação)
    const enviarConvite = (eventoId, email) => {
        const evento = eventos.find(e => e.id === eventoId);
        if (evento) {
            console.log(`Convite enviado para ${email} para o evento: ${evento.nome}`);
            return true;
        }
        return false;
    };

    // Função para listar todos os eventos
    const listarEventos = () => {
        return eventos;
    };

    // Retornando as funções públicas do módulo
    return {
        criarEvento,
        confirmarRSVP,
        adicionarComentario,
        enviarConvite,
        listarEventos
    };
})();

// Testes para verificar as funcionalidades do aplicativo
const testes = () => {
    // Criando um evento
    const evento1 = EventoApp.criarEvento("Festa de Aniversário", "2023-12-01", "Casa do João");
    console.log(evento1); // Exibindo o evento criado

    // Confirmando presença
    const rsvp1 = EventoApp.confirmarRSVP(evento1.id, "Maria");
    console.log(`RSVP de Maria: ${rsvp1}`); // Exibindo resultado do RSVP

    // Adicionando um comentário
    const comentario1 = EventoApp.adicionarComentario(evento1.id, "Estou animada para a festa!");
    console.log(`Comentário adicionado: ${comentario1}`); // Exibindo resultado do comentário

    // Enviando um convite
    const convite1 = EventoApp.enviarConvite(evento1.id, "maria@example.com");
    console.log(`Convite enviado: ${convite1}`); // Exibindo resultado do envio do convite

    // Listando todos os eventos
    const todosEventos = EventoApp.listarEventos();
    console.log(todosEventos); // Exibindo todos os eventos

    // Testando RSVP para um evento inexistente
    const rsvpInexistente = EventoApp.confirmarRSVP(999, "João");
    console.log(`RSVP para evento inexistente: ${rsvpInexistente}`); // Deve retornar falso

    // Testando adicionar comentário a um evento inexistente
    const comentarioInexistente = EventoApp.adicionarComentario(999, "Não posso ir.");
    console.log(`Adicionar comentário a evento inexistente: ${comentarioInexistente}`); // Deve retornar falso

    // Testando enviar convite para um evento inexistente
    const conviteInexistente = EventoApp.enviarConvite(999, "joao@example.com");
    console.log(`Enviar convite para evento inexistente: ${conviteInexistente}`); // Deve retornar falso
};

// Executando os testes
testes();
