const URL = "https://filazen.onrender.com";

async function ircadunidade() {
    const nomeempresa = document.getElementById("nomeempresa").value;
    const cnpj = document.getElementById("cnpj").value.replace(/\D/g, '');
    const tipos = document.querySelector('input[name="tipoempresa"]:checked')?.value;
    
    // O .trim() remove espaços em branco ou caracteres de controle invisíveis nas pontas
    const senhaempresa = document.getElementById("senhaempresa").value.trim();

    // Validação dos campos
    if (!nomeempresa || !cnpj || !tipos || !senhaempresa) {
        alert("Por favor, escreva algo");
        return;
    }

    try {
        const resposta = await fetch(URL + '/empresa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cnpj: cnpj,
                tipo: tipos,
                // CORREÇÃO: Enviando a variável 'cnpj' para a chave estrangeira (fk), 
                // e não o 'nomeempresa' como estava antes.
                fk_empresa_cnpj: cnpj, 
                senha: senhaempresa
                // OBS: Se a sua API também exigir o nome da empresa, 
                // adicione a linha abaixo (verifique o nome exato esperado pela API):
                // nome: nomeempresa 
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            window.location.href = "../../cadastros_logins/cadastrounidade.html";
        } else {
            // Exibe no console o erro exato retornado pelo servidor para ajudar no diagnóstico
            console.error("Erro do servidor:", dados);
            alert("Erro ao cadastrar: " + (dados.detail?.[0]?.msg || "Verifique os dados."));
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Não foi possível conectar ao servidor.");
    }
}
