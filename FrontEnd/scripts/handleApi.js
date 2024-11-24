export async function getDividas() {
    try{
        const response = await fetch("http://localhost:3000/dividas",{
            method: "GET",
        });
        if(!response.ok){
            // colocar modal aqui
        }else{
            const data = await response.json();
            return data;
        }
    
    }catch{
        // colocar modal aqui
    }
}

export async function updateDividaSelect() {
    try {
        const dividas = await getDividas();
        console.log(dividas)
        const select = document.getElementById("data-numero_divida");
        if (select) {
            const defaultOption = select.querySelector("option[value='']");
            if (defaultOption) {
                defaultOption.disabled = false;
            }
            select.innerHTML = "";
            if (defaultOption) {
                select.appendChild(defaultOption);
            }
            dividas.forEach(divida => {
                const option = document.createElement("option");
                option.value = divida.id;
                option.text = `${divida.nome_cliente} - Processo: ${divida.numero_processo}`;
                select.appendChild(option);
            });
        }
    } catch (error) {
        showMessageModal("Erro ao atualizar o select de dívidas!");
        setTimeout(() => {
            deactivateModal();
        }, 3000);
    }
}

export function handleChangeDivida(data) {
    console.log(data);
    Object.keys(data).forEach(key => {
        console.log(key);
        const element = document.getElementById(`data-${key}`);
        if (element) {
            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "SELECT") {
                element.value = data[key] || "";
                console.log(element)
            } else {
            element.textContent = data[key] || "";
            console.log(element)
            }
        }
    });
}

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

