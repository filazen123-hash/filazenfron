document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os botões da tela entrarcomo.html
    const btnCliente = document.querySelector('.button-group a:nth-child(1)');
    const btnAdmin = document.querySelector('.button-group a:nth-child(2)');

    if (btnCliente) {
        btnCliente.addEventListener('click', (event) => {
            event.preventDefault(); // Evita comportamento padrão do link
            window.location.href = 'logincliente.htm';
        });
    }

    if (btnAdmin) {
        btnAdmin.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'loginadm.html';
        });
    }
});