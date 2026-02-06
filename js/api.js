const URL_BASE = "http://localhost:3002";

const apiTarefas = {
    async buscarTarefas() {
        try {
            const response = await axios.get(`${URL_BASE}/tarefas`);
            const data = await response.data;
            return data;
        } catch (error) {
            console.log(error)
            throw new Error("Ocorreu um erro ao tentar buscar tarefas na api")
        }
    },

    async salvarTarefas(tarefa) {
        try {
            const response = await axios.post(`${URL_BASE}/tarefas`, tarefa);
            const data = await response.data;
            return data;
        } catch (error) {
            console.log(error)
            throw new Error("Ocorreu um erro ao tentar salvar tarefas na api")
        }
    },

     async buscarTarefasPorID(id) {
        try {
            const response = await axios.get(`${URL_BASE}/tarefas/${id}`,);
            const data = await response.data;
            return data;
        } catch (error) {
            console.log(error)
            throw new Error("Ocorreu um erro ao tentar buscar tarefas na api por id")
        }
    },

     async editarTarefas(tarefa) {
        try {
            const response = await axios.put(`${URL_BASE}/tarefas/${tarefa.id}`, tarefa);
            const data = await response.data;
            return data;
        } catch (error) {
            console.log(error)
            throw new Error("Ocorreu um erro ao tentar atualizar tarefas na api")
        }
    },

    async deletarTarefas(id) {
        try {
            const response = await axios.delete(`${URL_BASE}/tarefas/${id}`);
            const data = await response.data;
            return data;
        } catch (error) {
            console.log(error)
            throw new Error("Ocorreu um erro ao deletar tarefas na api")
        }
    }
}

export default apiTarefas