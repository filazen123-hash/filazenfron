const URL = "https://filazen.onrender.com"
async function cadastrado(){
    const nomefun = document.getElementById("nomefun").value;
    const senhafun = document.getElementById("senhafun").value;
    const unidadefun = document.getElementById("unidadefun").value;
     if( !nomefun || !senhafun || !unidadefun ){
        alert("Por favor, escreva algo");
        return;
    } 
        const resposta = await fetch(URL + '/funcionario', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                senha: senhafun,
                nome: nomefun,
                fk_unidade_nome_fantasia: unidadefun

            })
        });
            const dados = await resposta.json();
            if(resposta.ok){

                window.location.href = "../../cadastros_logins/loginadm.html"
                
            } else{
                alert(dados.detail || "Erro na hora do cadastro!");
            }
}