// src/validadorDocumentos.js

// Função para validar CPF
function validarCPF(cpf) {
    // Remove todos os caracteres não numéricos do CPF (pontuações como "." e "-")
    cpf = cpf.replace(/\D/g, '');

    // Verifica se o CPF tem exatamente 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos do CPF são iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        // Multiplica cada dígito do CPF por um peso decrescente (10 a 2)
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    // Calcula o resto da divisão da soma por 11
    let resto = (soma * 10) % 11;
    // Se o resto for 10 ou 11, considera como 0
    if (resto === 10 || resto === 11) resto = 0;
    // Verifica se o resto é igual ao primeiro dígito verificador do CPF
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        // Multiplica cada dígito do CPF por um peso decrescente (11 a 2)
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    // Calcula o resto da divisão da soma por 11
    resto = (soma * 10) % 11;
    // Se o resto for 10 ou 11, considera como 0
    if (resto === 10 || resto === 11) resto = 0;
    // Verifica se o resto é igual ao segundo dígito verificador do CPF
    if (resto !== parseInt(cpf.charAt(10))) return false;

    // Se passou por todas as verificações, o CPF é válido
    return true;
}

// Função para validar CNPJ
function validarCNPJ(cnpj) {
    // Remove todos os caracteres não numéricos do CNPJ (pontuações como ".", "/" e "-")
    cnpj = cnpj.replace(/\D/g, '');

    // Verifica se o CNPJ tem exatamente 14 dígitos
    if (cnpj.length !== 14) return false;

    // Verifica se todos os dígitos do CNPJ são iguais (ex: 11.111.111/1111-11)
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    // Calcula o primeiro dígito verificador
    let soma = 0;
    let peso = 5; // Peso inicial para o primeiro dígito verificador
    for (let i = 0; i < 12; i++) {
        // Multiplica cada dígito do CNPJ por um peso decrescente (5 a 2, depois 9 a 2)
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = (peso === 2) ? 9 : peso - 1; // Atualiza o peso
    }
    // Calcula o resto da divisão da soma por 11
    let resto = soma % 11;
    // Define o primeiro dígito verificador
    let digitoVerificador1 = (resto < 2) ? 0 : 11 - resto;
    // Verifica se o primeiro dígito verificador é igual ao do CNPJ
    if (digitoVerificador1 !== parseInt(cnpj.charAt(12))) return false;

    // Calcula o segundo dígito verificador
    soma = 0;
    peso = 6; // Peso inicial para o segundo dígito verificador
    for (let i = 0; i < 13; i++) {
        // Multiplica cada dígito do CNPJ por um peso decrescente (6 a 2, depois 9 a 2)
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = (peso === 2) ? 9 : peso - 1; // Atualiza o peso
    }
    // Calcula o resto da divisão da soma por 11
    resto = soma % 11;
    // Define o segundo dígito verificador
    let digitoVerificador2 = (resto < 2) ? 0 : 11 - resto;
    // Verifica se o segundo dígito verificador é igual ao do CNPJ
    if (digitoVerificador2 !== parseInt(cnpj.charAt(13))) return false;

    // Se passou por todas as verificações, o CNPJ é válido
    return true;
}

// Função para validar RG
function validarRG(rg) {
    // Remove todos os caracteres não numéricos do RG
    rg = rg.replace(/\D/g, '');

    // Verifica se o RG tem exatamente 9 dígitos
    if (rg.length !== 9) return false;

    // Verifica se todos os dígitos do RG são iguais (ex: 111111111)
    if (/^(\d)\1{8}$/.test(rg)) return false;

    // Se passou por todas as verificações, o RG é válido
    return true;
}

// Função para validar Título de Eleitor
function validarTituloEleitor(titulo) {
    // Remove todos os caracteres não numéricos do Título de Eleitor
    titulo = titulo.replace(/\D/g, '');

    // Verifica se o Título de Eleitor tem exatamente 12 dígitos
    if (titulo.length !== 12) return false;

    // Verifica se todos os dígitos do Título de Eleitor são iguais (ex: 111111111111)
    if (/^(\d)\1{11}$/.test(titulo)) return false;

    // Se passou por todas as verificações, o Título de Eleitor é válido
    return true;
}

// Função para validar CNH (Carteira Nacional de Habilitação)
function validarCNH(cnh) {
    // Remove todos os caracteres não numéricos da CNH
    cnh = cnh.replace(/\D/g, '');

    // Verifica se a CNH tem exatamente 11 dígitos
    if (cnh.length !== 11) return false;

    // Verifica se todos os dígitos da CNH são iguais (ex: 11111111111)
    if (/^(\d)\1{10}$/.test(cnh)) return false;

    // Se passou por todas as verificações, a CNH é válida
    return true;
}

// Função para validar Passaporte
function validarPassaporte(passaporte) {
    // Remove todos os caracteres não numéricos do Passaporte
    passaporte = passaporte.replace(/\D/g, '');

    // Verifica se o Passaporte tem exatamente 8 dígitos
    if (passaporte.length !== 8) return false;

    // Verifica se todos os dígitos do Passaporte são iguais (ex: 11111111)
    if (/^(\d)\1{7}$/.test(passaporte)) return false;

    // Se passou por todas as verificações, o Passaporte é válido
    return true;
}

// Exporta as funções para uso em outros módulos
module.exports = {
    validarCPF,
    validarCNPJ,
    validarRG,
    validarTituloEleitor,
    validarCNH,
    validarPassaporte
};