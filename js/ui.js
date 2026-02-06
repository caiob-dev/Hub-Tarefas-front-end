import apiTarefas from "./api.js";

const uiTarefas = {
  async renderizarTarefas() {
    const listaTarefas = document.getElementById("lista-tarefas");
    const msgOculta = document.querySelector(".msgOculta");

    listaTarefas.innerHTML = "";

    try {
      const tarefas = await apiTarefas.buscarTarefas();

      if (tarefas.length === 0) {
        msgOculta.style.display = "flex";
      } else {
        msgOculta.style.display = "none";
        tarefas.forEach(uiTarefas.adicionarTarefas);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Ocorreu um erro ao tentar renderizar tarefas na tela");
    }
  },

  async adicionarTarefas(tarefa) {
    const listaTarefas = document.getElementById("lista-tarefas");

    const li = document.createElement("li");
    li.classList.add("li-tarefa");
    li.setAttribute("data-id", tarefa.id);

    const divTarefa = document.createElement("div");
    divTarefa.classList.add("tarefa");
    divTarefa.textContent = `Tarefa: `;

    const divPrioridade = document.createElement("div");
    divPrioridade.classList.add("prioridade");
    divPrioridade.textContent = `Prioridade: ${tarefa.prioridade}`;

    const tarefaEscrita = document.createElement("h4");
    tarefaEscrita.classList.add("tarefa-escrita");
    tarefaEscrita.textContent = `${tarefa.tarefa}`;
    divTarefa.appendChild(tarefaEscrita);

    if (tarefa.prioridade[0].toLowerCase() === "a") {
      divPrioridade.classList.add("prioridade-alta");
    }

    if (tarefa.prioridade[0].toLowerCase() === "b") {
        divPrioridade.classList.add("prioridade-baixa");
    }

    const btnEditar = document.createElement("button");
    btnEditar.classList.add("botao-editar");

    btnEditar.addEventListener("click", async () => {
        btnEditar.scrollIntoView({ behavior: "smooth" });
        btnEditar.focus();
        uiTarefas.editarTarefasNoMural(tarefa.id);
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.classList.add("botao-excluir");

    btnExcluir.addEventListener("click", async () => {
      try {
        await apiTarefas.deletarTarefas(tarefa.id);
      } catch (error) {
        console.log(error);
        throw new Error("Erro ao excluir tarefas");
      }
    });

    const imgEditar = document.createElement("img");
    imgEditar.src = "assets/img/icone-editar.png";
    imgEditar.alt = "Editar";
    btnEditar.appendChild(imgEditar);

    const imgExcluir = document.createElement("img");
    imgExcluir.src = "assets/img/icone-excluir.png";
    imgExcluir.alt = "Editar";
    btnExcluir.appendChild(imgExcluir);

    const icones = document.createElement("div");
    icones.classList.add("icones");
    icones.appendChild(btnEditar);
    icones.appendChild(btnExcluir);

    li.appendChild(divTarefa);
    li.appendChild(divPrioridade);
    li.appendChild(icones);

    listaTarefas.appendChild(li);
  },

  async editarTarefasNoMural (tarefaID) {

    const tarefa = await apiTarefas.buscarTarefasPorID(tarefaID)

    document.getElementById("tarefa-id").value = tarefa.id;
    document.getElementById("nome").value = tarefa.tarefa;
    document.getElementById("prioridade").value = tarefa.prioridade;
  }
};



export default uiTarefas;
