import { handleForm } from "./handleForm.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  // Controle para fazer o submit e atualizar a lista
});

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



