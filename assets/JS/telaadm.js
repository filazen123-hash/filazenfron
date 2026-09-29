const URL = "https://filazen.onrender.com";

async function proximo() {
    // 1. Captura os valores dos inputs (certifique-se de colocar IDs nos seus inputs HTML)
    const senha = document.getElementById("senhacliente").value.trim();
    const nome = document.getElementById("nomecliente").value.trim();
    
    // Verifica se os checkboxes de prioridade estão marcados (exemplo usando IDs ou name)
    const simPrioridade = document.getElementById("prioridadeSim")?.checked;
    const confirmarPresenca = document.getElementById("confirmaPresenca")?.checked;

    if (!senha || !nome) {
        alert("Por favor, preencha a senha e o nome do cliente.");
        return;
    }

 
    const botao = document.getElementById("btnContinuar");
    if (botao) {
        botao.disabled = true;
        botao.innerText = "A processar...";
    }

    try {

        const resposta = await fetch(URL + '/fila/atualizar-por-senha', { 
            method: 'PUT', // Alterado de POST para PUT
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                senha: senha,
                nome: nome,
                prioridade: simPrioridade ? "Sim" : "Não",
                presenca: confirmarPresenca
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            if (botao) botao.innerText = "Sucesso!";
            alert("Atendimento processado com sucesso!");
            window.location.reload();
        } else {
            // Se der erro, destrava o botão para tentar de novo
            if (botao) {
                botao.disabled = false;
                botao.innerText = "CONTINUAR";
            }
            alert(dados.detail || "Erro ao processar as informações.");
        }
    } catch (erro) {
        if (botao) {
            botao.disabled = false;
            botao.innerText = "CONTINUAR";
        }
        console.error("Erro na requisição:", erro);
        alert("Não foi possível conectar ao servidor.");
    }
}
