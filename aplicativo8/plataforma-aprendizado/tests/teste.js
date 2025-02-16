// --- Arquivo: tests/teste.js ---
// Arquivo de testes para validar todas as funcionalidades principais

const Curso = require("../src/curso");
const Modulo = require("../src/modulo");
const Aluno = require("../src/aluno");
const Avaliacao = require("../src/avaliacao");
const Forum = require("../src/forum");
const Certificado = require("../src/certificado");
const Notificacao = require("../src/notificacao");
const assert = require("assert");

// Teste: Criar um novo curso
let cursoTeste = new Curso("Teste de JS", "Instrutor Teste");
assert.strictEqual(cursoTeste.nome, "Teste de JS");
assert.strictEqual(cursoTeste.instrutor, "Instrutor Teste");
console.log("Teste de criação de curso: OK");

// Teste: Criar um módulo e adicioná-lo ao curso
let moduloTeste = new Modulo("Módulo de Teste");
cursoTeste.adicionarModulo(moduloTeste);
assert.strictEqual(cursoTeste.modulos.length, 1);
assert.strictEqual(cursoTeste.modulos[0].nome, "Módulo de Teste");
console.log("Teste de adição de módulo: OK");

// Teste: Criar um aluno e inscrevê-lo no curso
let alunoTeste = new Aluno("João Teste");
alunoTeste.inscrever(cursoTeste);
assert.strictEqual(cursoTeste.alunos.length, 1);
assert.strictEqual(cursoTeste.alunos[0].nome, "João Teste");
console.log("Teste de inscrição de aluno: OK");

// Teste: Criar uma avaliação e validar resposta
let avaliacaoTeste = new Avaliacao("Quanto é 2 + 2?", "4");
assert.strictEqual(avaliacaoTeste.verificarResposta("4"), "Correto!");
assert.strictEqual(avaliacaoTeste.verificarResposta("3"), "Tente novamente.");
console.log("Teste de avaliação: OK");

// Teste: Criar um fórum e adicionar uma mensagem
let forumTeste = new Forum();
forumTeste.adicionarMensagem(alunoTeste.nome, "Essa aula foi muito boa!");
assert.strictEqual(forumTeste.mensagens.length, 1);
assert.strictEqual(forumTeste.mensagens[0].mensagem, "Essa aula foi muito boa!");
console.log("Teste de fórum: OK");

// Teste: Geração de certificado
let certificadoTeste = Certificado.gerar(alunoTeste, cursoTeste);
assert.strictEqual(certificadoTeste, "Certificado: João Teste concluiu o curso Teste de JS.");
console.log("Teste de geração de certificado: OK");

// Teste: Envio de notificação (Apenas verificamos se a função roda sem erros)
console.log("Verificando envio de notificação...");
Notificacao.enviar(alunoTeste, "Nova aula disponível!");
console.log("Teste de notificação: OK");
