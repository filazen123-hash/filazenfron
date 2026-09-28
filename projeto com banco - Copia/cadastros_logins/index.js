document.addEventListener('DOMContentLoaded', () => {
    const btnLogin = document.getElementById('btn-login');
    const btnCadastro = document.getElementById('btn-cadastro');

    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            window.location.href = 'cadastros_logins/entrarcomo.html';
        });
    }

    if (btnCadastro) {
        btnCadastro.addEventListener('click', () => {
            window.location.href = 'cadastros_logins/cadastrocomo.html';
        });
    }
});
