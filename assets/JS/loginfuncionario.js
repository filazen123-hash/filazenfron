const url = "https://filazen.onrender.com"
async function irescolha(event) {
    event.preventDefault();
    const senha = document.getElementById("senhafunlg").value;
    const empresa = document.getElementById("empresafunlg").value;
    const nome = document.getElementById("nome").value;
    if (senha === "" || empresa === "" || nome === "") {
        
        alert("Por favor, preencha todos os dados para sucesso!");
        return;
    }

    try {
        const resposta = await fetch(url + "/login_funcionario", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                senha: senha,
                empresa: empresa,
                nome : nome
            })
        });

        if (resposta.status === 200) {
            const dados = await resposta.json();
            alert("LOGIN REALIZADO, BEM-VINDO(A) DE VOLTA!");
    
            localStorage.setItem('funcionario_nome', dados.nome);
            localStorage.setItem('id_unidade', dados.id_unidade); // Guarda o id_unidade retornado!
            window.location.href= "../telas_administrativas/adminstradorBanco.html"
            
        } else {
            const erro = await resposta.json();
            alert(erro.detail || "Usuário ou senha incorretos!");
        }
    } catch (error) {
        alert("Erro ao conectar com o servidor!");
    }
}


