var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(){
    event.preventDefault();
    
    var form = document.querySelector("#form-adiciona");
    // Extraindo informações do paciente do form
    var paciente = obtemPacienteDoFormulario(form);

    // Cria a tr a td do paciente
    var pacienteTr = montaTr(paciente);

    // adicionando o paciente da tabela
    var tabela = document.querySelector("#tabela-pacientes");

    tabela.appendChild(pacienteTr);


});

function obtemPacienteDoFormulario(){
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr(paciente){
    var pacienteTr = document.createElement("tr");

    var pacienteTr = document.createElement("tr");

    var nomeTd = document.createElement("td");
    var pesoTd = document.createElement("td");
    var alturaTd = document.createElement("td");
    var gorduraTd = document.createElement("td");
    var imcTd = document.createElement("td");

    nomeTd.textContent = paciente.nome;
    pesoTd.textContent = paciente.peso;
    alturaTd.textContent = paciente.altura;
    gorduraTd.textContent = paciente.gordura;
    imcTd.textContent = paciente.imc;
    
    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
    pacienteTr.appendChild(imcTd);

    return pacienteTr;
}