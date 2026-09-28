const URL = "https://filazen.onrender.com"
async function ircadunidade() {
    const nomeempresa = document.getElementById("nomeempresa").value
    const cnpj = document.getElementById("cnpj").value.replace(/\D/g, '');
    const tipos = document.querySelector('input[name="tipoempresa"]:checked')?.value;

    const senhaempresa = document.getElementById("senhaempresa").value
    if( !nomeempresa || !cnpj || !tipos || !senhaempresa){
        alert("Por favor, escreva algo");
        return;
    } 
        const resposta = await fetch(URL + '/empresa', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                cnpj: cnpj,
                tipo: tipos,
                fk_empresa_cnpj: nomeempresa,
                senha: senhaempresa
            })
        });
            const dados = await resposta.json();
            if(resposta.ok){
                
                window.location.href = "../../cadastros_logins/cadastrounidade.html"
            } else{
                alert(dados.detail || "Erro na hora do cadastro!");
            }
}