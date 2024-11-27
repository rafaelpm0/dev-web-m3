document.addEventListener("DOMContentLoaded", () => {
    const cepInfo = document.getElementById("cep-info");
    const reloadBtn = document.getElementById("reload-btn");

    async function fetchCepData() {
        try {
            const response = await fetch("https://viacep.com.br/ws/01001000/json/");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayCepData(data);
        } catch (error) {
            console.error("Error fetching CEP data:", error);
        }
    }

    function displayCepData(data) {
        document.getElementById("cep").textContent = data.cep;
        document.getElementById("logradouro").textContent = data.logradouro;
        document.getElementById("complemento").textContent = data.complemento;
        document.getElementById("bairro").textContent = data.bairro;
        document.getElementById("localidade").textContent = data.localidade;
        document.getElementById("uf").textContent = data.uf;
        document.getElementById("ibge").textContent = data.ibge;
        document.getElementById("gia").textContent = data.gia;
        document.getElementById("ddd").textContent = data.ddd;
        document.getElementById("siafi").textContent = data.siafi;
    }

    reloadBtn.addEventListener("click", fetchCepData);

    // Fetch data on initial load
    fetchCepData();
});