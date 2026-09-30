const URL = "https://filazen.onrender.com";

async function cadastrado() {
    const nomecliente = document.getElementById("name").value;
    const datanascimento = document.getElementById("nascimento").value;
    const [anoNasc, mesNasc, diaNasc] = datanascimento.split('-').map(Number);
    
    const hoje = new Date();
    let idade = hoje.getFullYear() - anoNasc;
    const mesAtual = hoje.getMonth() + 1;
    const diaAtual = hoje.getDate();
    const anoAtual = hoje.getFullYear();
    const mesAtualFormatado = String(mesAtual).padStart(2, '0');
    document.getElementById("nascimento").max = `${anoAtual}-${mesAtualFormatado}

    if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
        idade--;
    }

    const eSessentaMais = idade >= 60;
    // Remove pontos e traço (deixa apenas números):
    const cpf = document.getElementById("cpf").value.replace(/\D/g, ''); 
    const emailcliente = document.getElementById("email").value;
    
    let genero = document.querySelector('input[name="genero"]:checked')?.value || "Naofalado";

    const radioPrioridade = document.querySelector('input[name="prioridades"]:checked');
    const seprioridade = radioPrioridade ? radioPrioridade.value.toLowerCase() === 'sim' : false;

    // 3. Combina os dois booleanos numa única variável booleana final
    const ePrioritario = Boolean(seprioridade || eSessentaMais);
    
    const senhacliente = document.getElementById("senha").value;

    if (!nomecliente || !senhacliente || !cpf) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    try {
        const resposta = await fetch(URL + '/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: nomecliente,
                senha: senhacliente,
                email: emailcliente,
                prioridade: ePrioritario,
                sexo: genero,
                cpf: cpf,
                data_nascimento: datanascimento
            })
        });

        if (resposta.ok) { // Aceita tanto 200 como 201
            const traduzido = await resposta.json();
            localStorage.setItem("id_cliente", cpf);
            window.location.href = "logincliente.html";
        } else {
            alert("Erro no cadastro. Verifique os dados digitados!");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Não foi possível conectar ao servidor.");
    }
}
async function voltar() {
    window.location.href = "cadastrocomo.html"
}
