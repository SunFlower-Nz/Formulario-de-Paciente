var tabela = document.querySelector("#tabela-pacientes");

tabela.addEventListener("click", function(event) {
    // Verifica se o elemento clicado é o botão de remover
    if (event.target.classList.contains('botao-remover')) {
        var pacienteTr = event.target.parentNode.parentNode; // O <tr> do paciente

        pacienteTr.classList.add("fadeOut");

        // Remove do localStorage
        let nomePacienteRemover = pacienteTr.querySelector(".info-nome").textContent;
        let pacientes = getPacientesFromStorage();
        let pacientesAtualizados = pacientes.filter(p => p.nome !== nomePacienteRemover);
        savePacientesToStorage(pacientesAtualizados);

        setTimeout(function() {
            pacienteTr.remove();
        }, 500); // Sincroniza com a animação CSS
    }
});


// Funções de storage (idealmente estariam em um arquivo 'storage.js' para não duplicar)
function getPacientesFromStorage() {
    return JSON.parse(localStorage.getItem("pacientes") || "[]");
}

function savePacientesToStorage(pacientes) {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
}