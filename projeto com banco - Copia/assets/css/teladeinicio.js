// Botão FAZER LOGIN
document.querySelectorAll(".btn-principal")[0].addEventListener("click", function () {
    window.location.href = "logincliente.htm";
});

// Botão CADASTRAR-SE
document.querySelectorAll(".btn-principal")[1].addEventListener("click", function () {
    window.location.href = "cadastro.html";
});

// Botão do perfil
document.querySelector(".profile-btn").addEventListener("click", function () {
    window.location.href = "perfil.html";
});

// Botão do menu
document.querySelector(".menu-btn").addEventListener("click", function () {
    window.location.href = "menu.html";
});