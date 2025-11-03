// js/main.js

import { router, navigate } from './router.js';

function setupResponsiveMenu() {
    const menuHamburguer = document.getElementById('menu-hamburguer');
    const navMenu = document.getElementById('nav-menu').querySelector('ul');
    
    menuHamburguer.addEventListener('click', () => {
        navMenu.classList.toggle('aberto');
    });
}

// --- PONTO DE ENTRADA DA APLICAÇÃO ---
// Garante que o código só rode depois que o HTML inicial for carregado.
document.addEventListener('DOMContentLoaded', () => {
    // 1. Configura o menu hambúrguer, que é um elemento fixo na página.
    setupResponsiveMenu();

    // 2. Configura o listener de navegação para os links da SPA.
    // Usamos delegação de evento para funcionar mesmo com o conteúdo mudando.
    document.body.addEventListener('click', event => {
        if (event.target.closest('.nav-link')) {
            navigate(event);
        }
    });

    // 3. Gerencia os botões de voltar/avançar do navegador.
    window.addEventListener('popstate', router);

    // 4. Carrega a rota inicial quando a página é aberta pela primeira vez.
    router();
});