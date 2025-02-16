
// --- Arquivo: index.js ---
// Arquivo principal para importar e testar as funcionalidades
const Curso = require("./curso");
const Modulo = require("./modulo");
const Aluno = require("./aluno");
const Avaliacao = require("./avaliacao");
const Forum = require("./forum");
const Certificado = require("./certificado");
const Notificacao = require("./notificacao");

// Criando um curso e um módulo
let cursoJS = new Curso("JavaScript Básico", "Prof. Carlos");
let modulo1 = new Modulo("Introdução ao JS");
cursoJS.adicionarModulo(modulo1);

// Criando um aluno e inscrevendo-o no curso
let aluno1 = new Aluno("Ana Silva");
aluno1.inscrever(cursoJS);

// Criando e respondendo uma avaliação
let avaliacao1 = new Avaliacao("Qual é a palavra-chave para declarar variáveis em JS?", "let");
console.log(avaliacao1.verificarResposta("let")); // Saída: Correto!

// Adicionando mensagens ao fórum
let forum = new Forum();
forum.adicionarMensagem(aluno1.nome, "Este curso é incrível!");

// Gerando certificado
console.log(Certificado.gerar(aluno1, cursoJS));

// Enviando notificação
Notificacao.enviar(aluno1, "Nova aula disponível no seu curso!");