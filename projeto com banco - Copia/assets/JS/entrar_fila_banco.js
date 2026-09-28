const URL_UNIDADES = "https://filazen.onrender.com";
const URL_ENTRAR_FILA = "https://filazen.onrender.com";

document.addEventListener("DOMContentLoaded", async () => {
    const selectUnidades = document.getElementById("unidades");
    const selectAtendimento = document.getElementById("tipo-atendimento-banco");
    const btnContinuar = document.querySelector("button");
    try {
        const resposta = await fetch(URL_UNIDADES + '/unidades-por-tipo/Banco');
        const dados = await resposta.json(); // Mudamos o nome para 'dados' para ficar claro

        // Verificamos se 'dados.unidades' existe e é uma lista válida
        if (dados.unidades && Array.isArray(dados.unidades)) {
            dados.unidades.forEach(unidade => {
                const option = document.createElement("option");
                option.value = unidade.id_unidade;       // ID numérico para a fila
                option.textContent = unidade.nome_fantasia; // Nome que vai aparecer no select
                selectUnidades.appendChild(option);
            });
        } else {
            console.error("A estrutura dos dados recebidos não é uma lista:", dados);
        }
    } catch (erro) {
        console.error("Erro ao carregar unidades do hospital:", erro);
    }

    btnContinuar.addEventListener("click", async (e) => {
        e.preventDefault(); 

        const idUnidade = selectUnidades.value;
        const opcaoSelecionada = selectAtendimento.options[selectAtendimento.selectedIndex];

        if (!idUnidade) {
            alert("Por favor, selecione uma agência!");
            return;
        }

        
        const isUrgente = opcaoSelecionada.dataset.urgente === "true";
        const tipoNivel = isUrgente ? "Nivel 2" : "Nivel 1";

     
        const servicoTexto = opcaoSelecionada.textContent.trim()

        try {
            const resposta = await fetch(URL_ENTRAR_FILA + '/entrar_fila', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_unidade: parseInt(idUnidade, 10),
                    tipo: tipoNivel,
                    servico_solicitado: servicoTexto,
                    id_cliente: localStorage.getItem("id_cliente") || null
                })
            });

            if (resposta.ok) {
                const dados = await resposta.json();
                localStorage.setItem("id_entradafila", dados.id_entradafila);
                window.location.href = "../FILAZEN2/fila.html";
            } else {
                const erroServidor = await resposta.json();
                alert(`Erro ao entrar na fila: ${erroServidor.detail || 'Tente novamente.'}`);
            }
        } catch (erro) {
            console.error("Erro na requisição:", erro);
        }
    });
});