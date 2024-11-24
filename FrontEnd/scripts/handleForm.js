export async function handleForm(data) {
    fetch("http://localhost:3000/dividas", {
        method: "POST",
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            showMessageModal("Divida cadastrada com sucesso!");
            setTimeout(() => {
                deactivateModal();
            }, 3000);
        })
        .catch((error) => {
            showMessageModal("Erro ao cadastrar divida!");

            setTimeout(() => {
                deactivateModal();
            }, 3000);
        });
}

function showMessageModal(message){
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    const div = document.createElement("div");
    div.className = 'messageContainer';
    div.innerHTML = `<h2>${message}</h2>`;
    modal.className = "modal active";
    modalContent.innerHTML = "";
    modalContent.appendChild(div);
}

function deactivateModal() {
    const modal = document.getElementById("modal");
    modal.className = "modal";
}

window.deactivateModal = deactivateModal;