var botaoBuscar = document.querySelector("#buscar-pacientes");

botaoBuscar.addEventListener("click", function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");

    xhr.addEventListener("load", function() {
        var erroAjax = document.querySelector("#erro-ajax");

        if (xhr.status == 200) {
            erroAjax.classList.add("invisivel");
            var resposta = xhr.responseText;
            var novosPacientes = JSON.parse(resposta);

            // Adiciona os novos pacientes na tabela e no localStorage
            let pacientesAtuais = getPacientesFromStorage();
            novosPacientes.forEach(function(paciente) {
                adicionaPacienteNaTabela(paciente);
                pacientesAtuais.push(paciente);
            });
            savePacientesToStorage(pacientesAtuais);

        } else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }
    });

    xhr.send();
});

// Funções de storage duplicadas para independência do script
function getPacientesFromStorage() {
    return JSON.parse(localStorage.getItem("pacientes") || "[]");
}

function savePacientesToStorage(pacientes) {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
}