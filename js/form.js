// --- INITIALIZATION ---
window.addEventListener("DOMContentLoaded", function() {
    // Carrega pacientes do localStorage ou usa um conjunto padrão
    let pacientes = getPacientesFromStorage();
    pacientes.forEach(paciente => adicionaPacienteNaTabela(paciente));
});

function getPacientesFromStorage() {
    let pacientesJSON = localStorage.getItem("pacientes");
    if (!pacientesJSON) {
        // Se não houver pacientes no cache, cria uma lista padrão
        const defaultPacientes = [
            { nome: "Paulo", peso: "100", altura: "2.00", gordura: "10", imc: "25.00" },
            { nome: "João", peso: "80", altura: "1.72", gordura: "40", imc: "27.04" },
            { nome: "Erica", peso: "54", altura: "1.64", gordura: "14", imc: "20.11" },
            { nome: "Douglas", peso: "85", altura: "1.73", gordura: "24", imc: "28.39" },
            { nome: "Tatiana", peso: "46", altura: "1.55", gordura: "19", imc: "19.13" }
        ];
        localStorage.setItem("pacientes", JSON.stringify(defaultPacientes));
        return defaultPacientes;
    }
    return JSON.parse(pacientesJSON);
}

function savePacientesToStorage(pacientes) {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
}

// --- ADD PATIENT LOGIC ---
var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteDoFormulario(form);
    var erros = validaPaciente(paciente);

    if (erros.length > 0) {
        exibeMensagensDeErro(erros);
        return;
    }

    adicionaPacienteNaTabela(paciente);
    
    // Adicionar ao localStorage
    let pacientes = getPacientesFromStorage();
    pacientes.push(paciente);
    savePacientesToStorage(pacientes);

    form.reset();
    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";
});

function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
    pacienteTr.classList.add('slideIn'); // Adiciona animação
}

function exibeMensagensDeErro(erros) {
    var ul = document.querySelector("#mensagens-erro"); // Corrigido o seletor
    ul.innerHTML = "";
    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario(form) { // Corrigido: 'form' como parâmetro
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    return paciente;
}

function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}

function validaPaciente(paciente) {
    var erros = [];
    if (paciente.nome.length == 0) erros.push("O nome não pode ser em branco");
    if (paciente.peso.length == 0) erros.push("O peso não pode ser em branco");
    if (paciente.altura.length == 0) erros.push("A altura não pode ser em branco");
    if (paciente.gordura.length == 0) erros.push("A gordura não pode ser em branco");
    if (!validaPeso(paciente.peso)) erros.push("Peso é inválido");
    if (!validaAltura(paciente.altura)) erros.push("Altura é inválida");
    return erros;
}
function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
    pacienteTr.appendChild(montaAcaoTd()); // Adiciona a célula com o botão

    return pacienteTr;
}

function montaAcaoTd() {
    var td = document.createElement("td");
    
    var botao = document.createElement("button");
    botao.classList.add("botao-remover");
    botao.textContent = "Remover";
    
    td.appendChild(botao);
    
    return td;
}