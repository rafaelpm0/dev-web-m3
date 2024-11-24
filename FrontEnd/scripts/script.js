import { handleForm, updateDividaSelect, handleChangeDivida, getDividas } from "./handleApi.js";

document.addEventListener("DOMContentLoaded", () => {

  updateDividaSelect();

  const formulario = document.getElementById("submitForm");

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nome_cliente = document.getElementById("nome_cliente").value;
    const cpf_cliente = document.getElementById("cpf_cliente").value;
    const email_cliente = document.getElementById("email_cliente").value;
    const cep = document.getElementById("cep").value;
    const numero = document.getElementById("numero").value;
    const complemento = document.getElementById("complemento").value;
    const valor = document.getElementById("valor").value;
    const descricao = document.getElementById("descricao").value;
    const situacao = document.getElementById("situacao").value;
    const numero_processo = document.getElementById("numero_processo").value;
    const arquivo_comprovante = document.getElementById("arquivo_comprovante")
      .files[0];

    const data = {
      nome_cliente,
      cpf_cliente,
      email_cliente,
      cep,
      numero,
      complemento,
      valor,
      descricao,
      situacao,
      numero_processo,
      arquivo_comprovante,
    };
    await handleForm(data);
  });

  const select = document.getElementById("data-numero_divida");
  select.addEventListener("change", async (event) => {
    const id = event.target.value;
    const dividas = await getDividas();
    const divida = dividas.find((divida) => divida.id == id);
    handleChangeDivida(divida);
  });

});
