const validadores = require('./src/index'); // Certifique-se de que o caminho está correto

console.log(validadores.validarCPF('123.456.789-09')); // Deve retornar false
console.log(validadores.validarCPF('111.444.777-35')); // Deve retornar true
