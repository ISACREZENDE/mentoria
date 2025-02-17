const Usuario = require('./redeSocial'); // Importa a classe Usuario

// Cria alguns usuários
const alice = new Usuario("Alice", "alice@example.com", "senha123");
const bob = new Usuario("Bob", "bob@example.com", "senha456");

// Teste 1: Adicionar amigos
alice.adicionarAmigo(bob);

// Teste 2: Seguir usuários
alice.seguirUsuario(bob);

// Teste 3: Postar atualizações
alice.postarAtualizacao("Olá, mundo!");
bob.postarAtualizacao("Oi, Alice!");

// Teste 4: Curtir postagens
bob.curtirPostagem(alice, 0); // Bob curte a postagem de Alice

// Teste 5: Comentar em postagens
bob.comentarPostagem(alice, 0, "Que legal!");

// Teste 6: Enviar mensagens diretas
alice.enviarMensagem(bob, "Oi, Bob! Como você está?");

// Teste 7: Alterar privacidade
alice.alterarPrivacidade("privado");

// Teste 8: Ver notificações
alice.verNotificacoes();
bob.verNotificacoes();
