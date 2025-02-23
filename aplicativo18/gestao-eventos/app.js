// Definindo um pacote para o aplicativo de gestão de eventos
const EventoApp = (() => {
    // Array para armazenar os eventos
    let eventos = [];

    // Função para criar um novo evento
    const criarEvento = (nome, data, local) => {
        // Criando um objeto evento
        const evento = {
            id: eventos.length + 1, // Atribuindo um ID único ao evento
            nome: nome, // Nome do evento
            data: data, // Data do evento
            local: local, // Local do evento
            rsvps: [], // Array para armazenar os RSVPs
            comentarios: [] // Array para armazenar os comentários
        };
        eventos.push(evento); // Adicionando o evento ao array de eventos
        return evento; // Retornando o evento criado
    };

    // Função para confirmar presença (RSVP)
    const confirmarRSVP = (eventoId, nomeConvidado) => {
        // Encontrando o evento pelo ID
        const evento = eventos.find(e => e.id === eventoId);
        if (evento) {
            // Adicionando o nome do convidado ao array de RSVPs
            evento.rsvps.push(nomeConvidado);
            return true; // Retornando verdadeiro se o RSVP foi adicionado
        }
        return false; // Retornando falso se o evento não foi encontrado
    };

    // Função para adicionar um comentário ao evento
    const adicionarComentario = (eventoId, comentario) => {
        // Encontrando o evento pelo ID
        const evento = eventos.find(e => e.id === eventoId);
        if (evento) {
            // Adicionando o comentário ao array de comentários
            evento.comentarios.push(comentario);
            return true; // Retornando verdadeiro se o comentário foi adicionado
        }
        return false; // Retornando falso se o evento não foi encontrado
    };

    // Função para enviar convites (simulação)
    const enviarConvite = (eventoId, email) => {
        // Encontrando o evento pelo ID
        const evento = eventos.find(e => e.id === eventoId);
        if (evento) {
            console.log(`Convite enviado para ${email} para o evento: ${evento.nome}`);
            return true; // Retornando verdadeiro se o convite foi enviado
        }
        return false; // Retornando falso se o evento não foi encontrado
    };

    // Função para listar todos os eventos
    const listarEventos = () => {
        return eventos; // Retornando o array de eventos
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
};

// Executando os testes
testes();