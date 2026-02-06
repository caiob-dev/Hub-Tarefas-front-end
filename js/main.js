import apiTarefas from "./api.js";
import uiTarefas from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  uiTarefas.renderizarTarefas();
});

const formulario = document.getElementById("formulario-tarefa");

formulario.addEventListener("submit", manipularSubmit);

async function manipularSubmit(e) {
  e.preventDefault();

  const id = document.getElementById("tarefa-id").value;
  const tarefa = document.getElementById("nome").value;
  const prioridade = document.getElementById("prioridade").value;

  try {
    if (id) {
      await apiTarefas.editarTarefas({ id, tarefa, prioridade });
    } else {
      await apiTarefas.salvarTarefas({ tarefa, prioridade });
      uiTarefas.renderizarTarefas();
    }
  } catch (error) {
    console.log(error)
    throw new Error("Erro ao submeter o formulário!")
  }
}

const btnCancelar = document.querySelector(".botao-cancelar");

btnCancelar.addEventListener("click", () => {
  const tarefa = document.getElementById("nome");
  const prioridade = document.getElementById("prioridade");

  tarefa.value = "";
  prioridade.value = "";
});