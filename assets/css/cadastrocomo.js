document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os botões da tela cadastrocomo.html
    const btnCliente = document.querySelector('.button-group a:nth-child(1)');
    const btnAdmin = document.querySelector('.button-group a:nth-child(2)');

    if (btnCliente) {
        btnCliente.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'cadastrocliente.html';
        });
    }

    if (btnAdmin) {
        btnAdmin.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'cadastroadm.html';
        });
    }
});