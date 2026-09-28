    const URL_BASE = "https://filazen.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    const idEntradaFila = localStorage.getItem("id_entradafila");

    if (!idEntradaFila) {
        alert("Nenhuma fila ativa encontrada para este dispositivo.");
        window.location.href = "../index.html";
        return;
    }

    // Carrega os dados imediatamente ao abrir a página
    carregarStatusFila(idEntradaFila);

    // Atualiza a cada 5 segundos automaticamente
    setInterval(() => carregarStatusFila(idEntradaFila), 5000);

    // Configura o botão de cancelamento
    const btnCancelar = document.getElementById("btnCancelarFila");
    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            if (confirm("Tem certeza que deseja sair da fila?")) {
                cancelarFila(idEntradaFila);
            }
        });
    }
});

// Busca e atualiza todos os dados da fila em uma única requisição
async function carregarStatusFila(idEntradaFila) {
    try {
        const resposta = await fetch(URL_BASE + `/fila/status/${idEntradaFila}`);
        
        if (resposta.status === 404) {
            alert("Sua entrada na fila não foi encontrada ou já foi finalizada.");
            limparESair();
            return;
        }

        if (!resposta.ok) {
            console.error("Erro ao buscar status da fila.");
            return;
        }

        const dados = await resposta.json();

        // 1. Atualiza Senha Atual em Atendimento
        document.getElementById("senhaMomento").textContent = dados.senha_atual || "Aguardando...";

        // 2. Atualiza a Sua Senha
        document.getElementById("senhaUsuario").textContent = dados.minha_senha || "---";

        // 3. Atualiza o Tempo Estimado (ex: 90 min -> 01:30h)
        const minutosTotais = dados.tempo_estimado_minutos || 0;
        document.getElementById("tempoEstimado").textContent = formatarTempo(minutosTotais);

        // 4. Atualiza as Últimas Senhas Chamadas
        const containerUltimas = document.getElementById("ultimasSenhasContainer");
        if (dados.ultimas_chamadas && dados.ultimas_chamadas.length > 0) {
            containerUltimas.innerHTML = dados.ultimas_chamadas
                .map(senha => `<p><span>${senha}</span></p>`)
                .join("");
        } else {
            containerUltimas.innerHTML = "<p><span>---</span></p>";
        }

    } catch (erro) {
        console.error("Erro de conexão com a API:", erro);
    }
}

// Converte minutos totais em formato de horas/minutos (Ex: 90 -> "01:30h")
function formatarTempo(minutosTotais) {
    const horas = Math.floor(minutosTotais / 60);
    const minutos = minutosTotais % 60;

    const hFormatada = String(horas).padStart(2, '0');
    const mFormatada = String(minutos).padStart(2, '0');

    return `${hFormatada}:${mFormatada}h`;
}

// Cancela a entrada na fila no backend e redireciona
async function cancelarFila(idEntradaFila) {
    try {
        const resposta = await fetch(`${URL_BASE}/fila/cancelar/${idEntradaFila}`, {
            method: "PUT"
        });

        if (resposta.ok) {
            alert("Sua participação na fila foi cancelada.");
            limparESair();
        } else {
            alert("Não foi possível cancelar no momento.");
        }
    } catch (erro) {
        console.error("Erro ao cancelar fila:", erro);
    }
}

// Limpa os dados salvos no navegador e volta para a tela inicial
function limparESair() {
    localStorage.removeItem("id_entradafila");
    localStorage.removeItem("minha_senha_formatada");
    window.location.href = "../index.html";
}