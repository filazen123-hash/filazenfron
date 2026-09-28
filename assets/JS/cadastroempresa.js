const URL = "https://onrender.com";

async function ircadunidade() {
    const nomeempresa = document.getElementById("nomeempresa").value;
    const cnpj = document.getElementById("cnpj").value.replace(/\D/g, '');
    const tipos = document.querySelector('input[name="tipoempresa"]:checked')?.value;
    const senhaempresa = document.getElementById("senhaempresa").value.trim();

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
                senha: senhaempresa,
                nome_social: nomeempresa 
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            window.location.href = "../../cadastros_logins/cadastrounidade.html";
        } else {
            console.log("Erro retornado do servidor:", dados);
            alert(dados.detail || "Erro na hora do cadastro!");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Não foi possível conectar ao servidor.");
    }
}
