const URL = "https://filazen.onrender.com"

async function irescolha(){
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    if(email == "" || senha == ""){
        alert("Por favor, preencha todos os dados para sucesso!")
        return;
    }
    const resposta = await fetch( URL + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    })
    if (resposta.status == 200){
        const dados =  await resposta.json();
        alert("CADASTRO FEITO, BEM VINDA(O) DE VOLTA");
        localStorage.setItem('usuario_nome', dados.nome)
        window.location.href = "../entrar_filas/levarpara.html"
    } else{
        alert ("usuário ou senha incorretos!");
    }
}

