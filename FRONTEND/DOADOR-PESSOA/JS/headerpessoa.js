// Script de Injeção de Header e Funcionalidades
(function() {
    'use strict';

    // Função para criar e injetar o CSS da header
    function injectHeaderCSS() {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css';
        document.head.appendChild(cssLink);

        const cssIconsLink = document.createElement('link');
        cssIconsLink.rel = 'stylesheet';
        cssIconsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';
        document.head.appendChild(cssIconsLink);

        const style = document.createElement('style');
        style.textContent = `
            @import url("https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&display=swap");
            @import url("https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap");

            body {
                font-family: "Lexend Deca", sans-serif;
                margin: 0;
                padding: 0;
            }

            .sidebar-expanded .container-fluid {
                padding-left: 180px;
            }

            .sidebar-expanded .navbar-nav {
                margin-left: 170px;
            }

            #imgheader {
                transition: margin-left 0.3s ease;
            }

            .sidebar-expanded #imgheader {
                margin-left: 20px;
            }

            .header.animated {
                animation: slideIn 0.5s ease-in-out;
            }

            .container-fluid {
                position: relative;
                transition: padding-left 0.3s ease;
            }

            .navbar {
                background-color: #ffffff;
                padding-left: 3rem;
                padding-right: 3rem;
                height: 56px;
                box-shadow: #b4b4b4 1px 0 3px 0px;
            }

            .navbar-nav {
                display: flex;
                justify-content: start;
                padding-left: 3rem;
                align-items: center;
                flex-grow: 1;
                list-style: none;
                margin-right: 3rem;
                gap: 3rem;
                font-size: 14px;
            }

            .container-fluid {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .profile-dropdown {
                position: absolute;
                display: flex;
                align-items: center;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
            }

            .profile-dropdown button {
                display: flex;
                align-items: center;
                gap: 10px;
                border: none;
                background: none;
                font-size: 16px;
                color: black;
            }

            .dropdown-item {
                display: flex;
                align-items: center;
                padding: 8px 15px;
                text-decoration: none;
                color: #333;
                transition: background-color 0.2s;
            }

            .dropdown-item:hover {
                background-color: #e0e0e0;
                border-radius: 6px;
            }

            .dropdown-item i {
                margin-right: 10px;
                font-size: 16px;
            }

            .profile-dropdown img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid #CCC;
            }

            .dropdown-menu {
                position: absolute;
                top: 100%;
                right: 0;
                display: none;
                background: #ECECEC;
                border: none;
                padding: 10px;
            }

            .profile-dropdown:hover .dropdown-menu {
                display: block;
            }

            #imgheader {
                background-color: #D3D3D3;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                width: 220px;
                z-index: 800;
                height: 38px;
            }

            .upload-btn input {
                display: none;
            }

            .profile-dropdown img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid #CCC;
                display: none;
            }

            #userIcon {
                font-size: 40px;
                color: #CCC;
                display: inline;
            }

            header {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 200;
            }

            i {
                font-size: 23px;
            }

            #dropzinho {
                position: absolute;
                top: 100%;
                right: 0;
                display: none;
                background: #ECECEC;
                border: none;
                border-radius: 8px;
                padding: 10px;
                min-width: 150px;
                z-index: 1000;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            .bi-person {
                font-size: 1.1rem;
            }

            .bi-box-arrow-right {
                font-size: 1.1rem;
            }

            @media (min-width: 1024px) {
              .navbar-toggler {
                  display: none;
              }
            }

            @media (min-width: 1024px) and (max-width: 1400px) {
                .navbar {
                    height: 42px;
                }

                #bb {
                    font-size: 16px;
                }

                .bi-person-circle {
                    font-size: 15px;
                    color: #ccc;
                }
            }

            @media (max-width: 1023px) {
                .navbar-collapse {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background-color: #ffffff;
                    box-shadow: #b4b4b4 1px 0 3px 0px;
                    border-radius: 15px;
                    margin-top: 0.4rem;
                    padding: 15px;
                    z-index: 900;
                }
                
                .navbar-nav {
                    flex-direction: column;
                    align-items: flex-start;
                    width: 100%;
                    gap: 5px;
                    padding: 0;
                    margin: 0;
                }
                
                .nav-item {
                    width: 100%;
                }
                
                .nav-link {
                    padding: 8px 10px;
                }
                
                .profile-dropdown {
                    position: static;
                    transform: none;
                    width: 100%;
                    margin-top: 5px;
                }
                
                .profile-dropdown button {
                    width: 100%;
                    justify-content: flex-start;
                    padding: 8px 10px;
                }
                
                .dropdown-menu {
                    position: static;
                    width: 100%;
                    box-shadow: none;
                    padding-left: 20px;
                    background: none;
                }

                .dropdown-item {
                    padding: 8px 0;
                }

                .bi-three-dots {
                    font-size: 20px;
                }

                #icone:focus, #icone2:focus {
                    outline: none;
                    box-shadow: none;
                }
            }

            @media (max-width: 768px) {
                #btnn2 {
                    width: 190px;
                    padding: 10px;
                    display: inline-block;
                    align-items: center;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Função para criar e injetar o HTML da header
    function injectHeaderHTML() {
        const headerHTML = `
            <header>
                <nav class="navbar navbar-expand-lg">
                    <div class="container-fluid">
                        <button id="icone2" class="navbar-toggler" type="button" onclick="toggleSidebar()">
                            <i style="font-size: 12px" class="navbar-toggler-icon"></i>
                        </button>

                        <div id="imgheader" style="background-color: #D3D3D3; border-radius: 5px; cursor: pointer; width: 220px; height: 38px; z-index: 800;"></div>

                        <button id="icone" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                            <span style="font-size: 20px" class="bi bi-three-dots"></span>
                        </button>

                        <div class="collapse navbar-collapse item" id="navbarNav">
                            <ul id="abcd" class="navbar-nav mx-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="">Quem somos?</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Saiba mais</a>
                                </li>
                                <li class="nav-item profile-dropdown">
                                    <button class="btn btn-link" id="usuario" style="font-size: 14px; text-decoration: none">
                                        <i id="userIcon" class="bi bi-person-circle" style="
                                            font-size: 250%;
                                            color: #ccc"></i>
                                        <span>Nome do Usuário</span>
                                    </button>
                                    <div id="dropzinho" class="dropdown-menu">
                                        <a class="dropdown-item" href="perfilpessoa.html"><i class="bi bi-person"></i> Perfil</a>
                                        <a class="dropdown-item" href="compradorantes.html"><i class="bi bi-box-arrow-right"></i> Sair</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        `;
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }

    // Função para injetar os scripts do Bootstrap
    function injectBootstrapJS() {
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
        document.head.appendChild(bootstrapScript);
    }

    // Função principal de inicialização
    function initHeaderAndFunctionalities() {
        injectHeaderCSS();
        injectHeaderHTML();
        injectBootstrapJS();
        document.body.style.paddingTop = '56px';

        console.log('Header injetada com sucesso!');

        setupHeaderFunctionalities();
    }

    // Função que contém o código de funcionalidades da header
    function setupHeaderFunctionalities() {
        const navbarCollapse = document.getElementById('navbarNav');
        const toggleButton = document.getElementById('icone');
        const usuarioBtn = document.getElementById("usuario");
        const dropdownMenu = document.getElementById("dropzinho");

        // Funções auxiliares
        function setupProfileDropdown() {
            if (!usuarioBtn || !dropdownMenu) return;

            const isMobile = window.innerWidth <= 1023;

            if (isMobile) {
                usuarioBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
                });

                document.addEventListener("click", function (e) {
                    if (!usuarioBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                        dropdownMenu.style.display = "none";
                    }
                });
            } else {
                const profileDropdown = document.querySelector(".profile-dropdown");
                if (profileDropdown) {
                    profileDropdown.addEventListener("mouseenter", function () {
                        dropdownMenu.style.display = "block";
                    });
                    profileDropdown.addEventListener("mouseleave", function () {
                        dropdownMenu.style.display = "none";
                    });
                }
            }
        }

        // Configuração de eventos
        if (window.bootstrap && navbarCollapse) {
            new bootstrap.Collapse(navbarCollapse, { toggle: false });
            navbarCollapse.addEventListener('hidden.bs.collapse', function () {
                if (toggleButton) {
                    toggleButton.classList.remove('collapsed');
                    toggleButton.setAttribute('aria-expanded', 'false');
                }
            });
        }

        if (toggleButton) {
            toggleButton.addEventListener('click', function () {
                if (navbarCollapse) {
                    navbarCollapse.classList.toggle('show');
                    const isExpanded = navbarCollapse.classList.contains('show');
                    toggleButton.setAttribute('aria-expanded', isExpanded);
                }
            });
        }

        window.addEventListener("resize", function () {
            setupProfileDropdown();
        });

        // Chamadas de funções de setup ao carregar a página
        setupProfileDropdown();
    }

    // Executa a função de inicialização quando o DOM estiver carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeaderAndFunctionalities);
    } else {
        initHeaderAndFunctionalities();
    }
})();