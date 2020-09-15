var titulo = document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista";

var pacientes = document.querySelectorAll(".paciente");

for (var i = 0; i< paciente.length; i++){
    var paciente = pacientes[i];

    var tdPeso = paciente.querySelector(".info-peso");

    var peso = tdPeso.textContent;

    var tdAltura = paciente.querySelector(".info-altura");
    var altura = tdAltura.textContent;

    var tdImc = paciente.querySelector(".info-imc");

    var pesoEvadido = true;
    var alturaEValido = true;

    if(peso <= 0 || peso >= 1000){
        console.log("Peso Inválido!");
        pesoEvadido = false;
        tdImc.textContent = "Peso Inválido!";
        paciente.classList.add("paciente-invalidado");
    }

    if(altura <= 0 || altura >= 4.00){
        console.log("Altura Inválido!");
        alturaEValido = false;
        tdImc.textContent = "Altura Inválido!";
        paciente.classList.add("paciente-invalidado");
    }

    if(alturaEValido && pesoEvadido){
        var imc = peso / (altura * altura);
        tdImc.textContent = imc;
    }
}

function calculaImc(peso, altura){
    var imc = 0

    imc = peso / (altura * altura);

    return imc.toFixed[2];
}




