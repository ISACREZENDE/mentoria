// tests/test.js
const {
    validarCPF,
    validarCNPJ,
    validarRG,
    validarTituloEleitor,
    validarCNH,
    validarPassaporte
} = require('../src/validadorDocumentos');

// Função para exibir resultados de teste de forma descritiva
function testarDocumento(nomeDocumento, documento, funcaoValidacao, resultadoEsperado) {
    const resultado = funcaoValidacao(documento);
    console.log(`${nomeDocumento} "${documento}" é válido? ${resultado} (Esperado: ${resultadoEsperado})`);
}

// Testes para CPF
console.log('--- Testes para CPF ---');
testarDocumento('CPF', '123.456.789-09', validarCPF, true); // Válido
testarDocumento('CPF', '111.111.111-11', validarCPF, false); // Inválido (dígitos repetidos)
testarDocumento('CPF', '123.456.789-00', validarCPF, false); // Inválido (dígitos verificadores incorretos)
testarDocumento('CPF', '123', validarCPF, false); // Inválido (tamanho incorreto)

// Testes para CNPJ
console.log('\n--- Testes para CNPJ ---');
testarDocumento('CNPJ', '12.345.678/0001-95', validarCNPJ, true); // Válido
testarDocumento('CNPJ', '11.111.111/1111-11', validarCNPJ, false); // Inválido (dígitos repetidos)
testarDocumento('CNPJ', '12.345.678/0001-00', validarCNPJ, false); // Inválido (dígitos verificadores incorretos)
testarDocumento('CNPJ', '123', validarCNPJ, false); // Inválido (tamanho incorreto)

// Testes para RG
console.log('\n--- Testes para RG ---');
testarDocumento('RG', '123456789', validarRG, true); // Válido
testarDocumento('RG', '111111111', validarRG, false); // Inválido (dígitos repetidos)
testarDocumento('RG', '123', validarRG, false); // Inválido (tamanho incorreto)

// Testes para Título de Eleitor
console.log('\n--- Testes para Título de Eleitor ---');
testarDocumento('Título de Eleitor', '123456789012', validarTituloEleitor, true); // Válido
testarDocumento('Título de Eleitor', '111111111111', validarTituloEleitor, false); // Inválido (dígitos repetidos)
testarDocumento('Título de Eleitor', '123', validarTituloEleitor, false); // Inválido (tamanho incorreto)

// Testes para CNH
console.log('\n--- Testes para CNH ---');
testarDocumento('CNH', '12345678901', validarCNH, true); // Válido
testarDocumento('CNH', '11111111111', validarCNH, false); // Inválido (dígitos repetidos)
testarDocumento('CNH', '123', validarCNH, false); // Inválido (tamanho incorreto)

// Testes para Passaporte
console.log('\n--- Testes para Passaporte ---');
testarDocumento('Passaporte', '12345678', validarPassaporte, true); // Válido
testarDocumento('Passaporte', '11111111', validarPassaporte, false); // Inválido (dígitos repetidos)
testarDocumento('Passaporte', '123', validarPassaporte, false); // Inválido (tamanho incorreto)
