const URL = "https://filazen.onrender.com"
async function cadastrarfuncionario(){
    const  nomeuni = document.getElementById("nomeunidade").value
    const endereco = document.getElementById("endereco").value
    const  cep = document.getElementById("cep").value.replace(/\D/g, '');
    const empresaresp = document.getElementById("nomeempresa").value.replace(/\D/g, '');
    if( !nomeuni || !endereco || !cep || !empresaresp){
        alert("Por favor, escreva algo");
        return;
    } 
        const resposta = await fetch(URL + '/unidade', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                nome_fantasia: nomeuni,
                endereco: endereco,
                cep: cep,
                fk_empresa_cnpj: empresaresp
            })
        });
            const dados = await resposta.json();
            if(resposta.ok){

                window.location.href = "../../cadastros_logins/cadastrofuncionario.html"
                
            } else{
                alert(dados.detail || "Erro na hora do cadastro!");
            }
}
async function voltar() {
    window.location.href = "cadastrocomo.html"
}
