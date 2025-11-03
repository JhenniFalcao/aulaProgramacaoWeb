import { initFormValidation } from './validation.js';

// Armazena o HTML de cada "página" como um template com os textos originais completos
const templates = {
    home: `
        <div class="container">
            <section id="sobre">
                <h2>Sobre Nós</h2>
                <p>A ONG Esperança atua há mais de 10 anos promovendo ações sociais, educação e saúde para comunidades carentes. Nosso compromisso é com a transformação social, oferecendo oportunidades e construindo um futuro mais justo para todos.</p>
                <a href="/projetos" class="btn btn-primario nav-link">Conheça Nossos Projetos</a>
            </section>
            <section id="missao">
                <h2>Missão, Visão e Valores</h2>
                <div class="row">
                    <div class="col-12 col-md-4"><div class="feature-box"><h3>Missão</h3><p>Promover inclusão e dignidade através de ações efetivas em educação, saúde e desenvolvimento comunitário.</p></div></div>
                    <div class="col-12 col-md-4"><div class="feature-box"><h3>Visão</h3><p>Ser referência nacional em transformação social, inspirando solidariedade e criando um legado de esperança.</p></div></div>
                    <div class="col-12 col-md-4"><div class="feature-box"><h3>Valores</h3><p>Solidariedade, transparência, respeito, comprometimento e inovação social.</p></div></div>
                </div>
            </section>
            <section id="contato">
                <h2>Contato</h2>
                <p><strong>Email:</strong> contato@ongesperanca.org.br</p>
                <p><strong>Telefone:</strong> (11) 99999-9999</p>
            </section>
            <img src="assets/img/banner.png" alt="Banner da ONG Esperança" class="banner">
        </div>`,
    projetos: `
        <div class="container">
            <section id="nossos-projetos">
                <h2>Nossos Projetos Sociais</h2>
                <p>Conheça as iniciativas que estão transformando comunidades e saiba como você pode fazer parte dessa mudança.</p>
                <div class="cards-grid">
                    <div class="card"><img src="assets/img/projeto-educacao.jpg" alt="Crianças estudando" class="card-imagem"><div class="card-corpo"><h3>Educação para o Futuro</h3><p>Oferecemos aulas de reforço escolar, oficinas de leitura e atividades culturais para crianças e adolescentes.</p><div class="card-tags"><span class="badge badge-educacao">Educação</span><span class="badge badge-comunidade">Comunidade</span></div></div></div>
                    <div class="card"><img src="assets/img/projeto-saude.jpg" alt="Profissional de saúde" class="card-imagem"><div class="card-corpo"><h3>Saúde em Foco</h3><p>Campanhas de vacinação, palestras sobre prevenção de doenças e atendimento médico básico para a comunidade.</p><div class="card-tags"><span class="badge badge-saude">Saúde</span></div></div></div>
                    <div class="card"><img src="assets/img/projeto-sopa-solidaria.jpg" alt="Voluntários servindo comida" class="card-imagem"><div class="card-corpo"><h3>Sopa Solidária</h3><p>Distribuição semanal de refeições nutritivas para pessoas em situação de vulnerabilidade social.</p><div class="card-tags"><span class="badge badge-comunidade">Comunidade</span></div></div></div>
                </div>
            </section>
            <section id="voluntariado">
                <h2>Seja um Voluntário</h2>
                <p>O trabalho voluntário é a alma da nossa organização. Dedique seu tempo e talento para causas que importam. Temos vagas para diversas áreas, desde apoio logístico em eventos até aulas de reforço para crianças.</p>
                <a href="/cadastro" class="btn btn-primario nav-link">Cadastre-se Agora</a>
            </section>
            <section id="doar">
                <h2>Como Doar</h2>
                <p>Sua doação é fundamental para mantermos nossos projetos ativos. Qualquer quantia é bem-vinda e será usada com total transparência para financiar nossas ações.</p>
                <p><strong>Chave PIX (CNPJ):</strong> 12.345.678/0001-99</p>
            </section>
        </div>`,
    cadastro: `
        <div class="container">
            <section id="formulario-cadastro">
                <h2>Formulário de Cadastro de Voluntário</h2>
                <p>Preencha os campos abaixo. A validação ocorrerá em tempo real.</p>
                <div class="alert alert-sucesso hidden" id="form-alert" role="alert">
                    <span><strong>Sucesso!</strong> Cadastro enviado.</span>
                    <button class="alert-close" id="alert-close-btn" aria-label="Fechar">&times;</button>
                </div>
                <form id="form-voluntario" novalidate>
                    <fieldset>
                        <legend>Dados Pessoais</legend>
                        <div class="form-group">
                            <label for="nome">Nome Completo:</label>
                            <input type="text" id="nome" name="nome" required minlength="3">
                            <div class="error-message"></div>
                        </div>
                        <div class="form-group">
                            <label for="email">E-mail:</label>
                            <input type="email" id="email" name="email" required>
                            <div class="error-message"></div>
                        </div>
                        <div class="form-group">
                            <label for="cpf">CPF:</label>
                            <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}">
                             <div class="error-message"></div>
                        </div>
                    </fieldset>
                    <button type="submit" class="btn btn-primario">Enviar Cadastro</button>
                </form>
            </section>
        </div>`
};

// Mapeia os caminhos da URL para os templates e títulos
const routes = {
    '/': { template: templates.home, title: 'ONG Esperança - Início' },
    '/projetos': { template: templates.projetos, title: 'ONG Esperança - Projetos' },
    '/cadastro': { template: templates.cadastro, title: 'ONG Esperança - Cadastro' }
};

const appContent = document.getElementById('app-content');

// Função principal do roteador
export function router() {
    const path = window.location.pathname;
    const route = routes[path] || routes['/']; // Pega a rota ou a padrão
    
    document.title = route.title;
    appContent.innerHTML = route.template;

    if (path === '/cadastro') {
        initFormValidation(); // Se for a página de cadastro, ativa a validação
    }
    
    updateActiveLink(path);
}

// Atualiza qual link do menu está com a classe "ativo"
function updateActiveLink(path) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('ativo');
        if (link.getAttribute('href') === path) {
            link.classList.add('ativo');
        }
    });
}

// Navega para uma nova "página" sem recarregar
export function navigate(event) {
    event.preventDefault();
    const path = event.target.closest('.nav-link').getAttribute('href');
    window.history.pushState({}, '', path); // Atualiza a URL
    router(); // Renderiza o novo conteúdo
}