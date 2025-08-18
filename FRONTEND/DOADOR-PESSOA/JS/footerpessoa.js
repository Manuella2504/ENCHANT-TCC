// footer.js - Componente Footer Reutilizável

class FooterComponent {
    constructor() {
        this.footerHTML = `
            <footer class="main-footer">
                <div class="footer-content">
                    <div class="footer-left">
                        <div class="footer-logo-upload" id="footerLogoUpload">
                            <input type="file" id="footerLogoInput" accept="image/*">
                        </div>
                        <p class="footer-text">
                            De forma alguma o site foi criado com o intuito de desviar os termos
                            relacionados à política de privacidade do cadastrante. O site está
                            disponível para toda e qualquer ajuda em relação aos contatos.
                        </p>
                        <p class="footer-text">© 2025 ENCHANT Brasil</p>
                    </div>

                    <div class="footer-right">
                        <div class="footer-column">
                            <h3>MAIS INFORMAÇÕES</h3>
                            <a href="#saibamaisong.html">Conheça mais sobre o site</a>
                        </div>
                        <div class="footer-column">
                            <h3>PROTEÇÃO DE DADOS</h3>
                            <a href="privacidade1.html">Política de privacidade</a>
                        </div>
                        <div class="footer-column">
                            <h3>ACOMPANHE NOSSAS REDES</h3>
                            <button id="instagramBtn">Instagram</button>
                            <button id="facebookBtn">Facebook</button>
                        </div>
                    </div>
                </div>
            </footer>
        `;

        this.footerCSS = `
            <style>
                /* ===== VARIÁVEIS E RESET ===== */
                :root {
                    --primary-color: #693B11;
                    --accent-color: #EC9E07;
                    --text-color: #333;
                    --light-bg: #ECECEC;
                    --white: #FFFFFF;
                    --shadow: rgba(180, 180, 180, 0.3);
                    --sidebar-width: 230px;
                    --sidebar-collapsed: 50px;
                    --header-height: 56px;
                    --transition: 0.3s ease;
                }

                /* ===== FOOTER ===== */
                .main-footer {
                    background-color: #FCF2E8;
                    padding: 30px 50px;
                    margin-left: var(--sidebar-collapsed);
                    transition: var(--transition);
                }

                .footer-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 40px;
                    flex-wrap: wrap;
                }

                .footer-left {
                    max-width: 400px;
                }

                .footer-logo-upload {
                    background-color: #D3D3D3;
                    border: none;
                    height: 60px;
                    border-radius: 5px;
                    cursor: pointer;
                    width: 200px;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }

                .footer-logo-upload input {
                    display: none;
                }

                .footer-text {
                    font-size: 10px;
                    line-height: 1.5;
                    margin-bottom: 10px;
                }

                .footer-right {
                    display: flex;
                    gap: 40px;
                    margin-top: 20px;
                }

                .footer-column {
                    display: flex;
                    flex-direction: column;
                    min-width: 200px;
                    text-align: center;
                }

                .footer-column h3 {
                    font-weight: 400;
                    font-size: 16px;
                    color: #535151;
                    margin-bottom: 10px;
                }

                .footer-column a,
                .footer-column button {
                    color: var(--accent-color);
                    text-decoration: none;
                    font-size: 12px;
                    display: block;
                    margin-bottom: 5px;
                    background: none;
                    border: none;
                    cursor: pointer;
                }

                .footer-column a:hover,
                .footer-column button:hover {
                    text-decoration: underline;
                    color: #8B7777;
                }

                /* ===== RESPONSIVIDADE ===== */
                @media (max-width: 1024px) {
                    .main-footer {
                        margin-left: 0;
                    }
                }

                @media (max-width: 768px) {
                    .footer-content {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                        gap: 20px;
                        padding: 0 10px;
                    }

                    .footer-left {
                        max-width: 100%;
                        width: 100%;
                    }

                    .footer-logo-upload {
                        width: 150px;
                        height: 50px;
                        margin: 0 auto 15px auto;
                    }

                    .footer-right {
                        flex-direction: column;
                        gap: 15px;
                        width: 100%;
                        margin-top: 0;
                    }

                    .footer-column {
                        min-width: auto;
                        width: 100%;
                    }

                    .footer-column h3 {
                        font-size: 14px;
                        margin-bottom: 8px;
                    }

                    .footer-column a,
                    .footer-column button {
                        font-size: 12px;
                        margin-bottom: 3px;
                    }

                    .footer-text {
                        font-size: 9px;
                        margin-bottom: 8px;
                        text-align: center;
                    }

                    .main-footer {
                        padding: 15px 10px;
                    }
                }

                /* ===== RESPONSIVIDADE TABLET ===== */
                @media (min-width: 769px) and (max-width: 1024px) {
                    .footer-content {
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 30px;
                    }

                    .footer-left {
                        max-width: 100%;
                        text-align: center;
                        margin-bottom: 20px;
                    }

                    .footer-right {
                        justify-content: center;
                        gap: 30px;
                        width: 100%;
                    }

                    .footer-column {
                        min-width: 180px;
                    }

                    .footer-column h3 {
                        font-size: 15px;
                    }

                    .footer-column a,
                    .footer-column button {
                        font-size: 11px;
                    }

                    .footer-text {
                        font-size: 10px;
                    }

                    .main-footer {
                        padding: 25px 20px;
                    }
                }
            </style>
        `;
    }

    // Método para renderizar o footer
    render(containerId = 'footer-container') {
        // Adiciona o CSS ao head se ainda não foi adicionado
        if (!document.querySelector('#footer-styles')) {
            const styleElement = document.createElement('div');
            styleElement.innerHTML = this.footerCSS;
            styleElement.id = 'footer-styles';
            document.head.appendChild(styleElement.firstElementChild);
        }

        // Adiciona o HTML do footer ao container especificado
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = this.footerHTML;
            this.initializeEventListeners();
        } else {
            console.error(`Container com ID '${containerId}' não encontrado`);
        }
    }

    // Método para renderizar automaticamente no final do body
    autoRender() {
        // Adiciona o CSS ao head
        if (!document.querySelector('#footer-styles')) {
            const styleElement = document.createElement('div');
            styleElement.innerHTML = this.footerCSS;
            styleElement.id = 'footer-styles';
            document.head.appendChild(styleElement.firstElementChild);
        }

        // Adiciona o footer ao final do body
        document.body.insertAdjacentHTML('beforeend', this.footerHTML);
        this.initializeEventListeners();
    }

    // Inicializa os event listeners do footer
    initializeEventListeners() {
        

        // Event listeners para botões de redes sociais
        const instagramBtn = document.getElementById('instagramBtn');
        const facebookBtn = document.getElementById('facebookBtn');

        if (instagramBtn) {
            instagramBtn.addEventListener('click', () => {
                // Substitua pelo link real do Instagram
                window.open('https://instagram.com/enchantbrasil', '_blank');
            });
        }

        if (facebookBtn) {
            facebookBtn.addEventListener('click', () => {
                // Substitua pelo link real do Facebook
                window.open('https://facebook.com/enchantbrasil', '_blank');
            });
        }
    }

    // Método para atualizar links personalizados
    updateLinks(links = {}) {
        if (links.saibaMais) {
            const saibaMaisLink = document.querySelector('a[href="#saibamaisong.html"]');
            if (saibaMaisLink) {
                saibaMaisLink.href = links.saibaMais;
            }
        }

        if (links.privacidade) {
            const privacidadeLink = document.querySelector('a[href="privacidade1.html"]');
            if (privacidadeLink) {
                privacidadeLink.href = links.privacidade;
            }
        }

        if (links.instagram) {
            const instagramBtn = document.getElementById('instagramBtn');
            if (instagramBtn) {
                instagramBtn.onclick = () => window.open(links.instagram, '_blank');
            }
        }

        if (links.facebook) {
            const facebookBtn = document.getElementById('facebookBtn');
            if (facebookBtn) {
                facebookBtn.onclick = () => window.open(links.facebook, '_blank');
            }
        }
    }
}

// Função de conveniência para uso simples
function loadFooter(containerId, options = {}) {
    const footer = new FooterComponent();
    
    if (containerId) {
        footer.render(containerId);
    } else {
        footer.autoRender();
    }

    // Atualiza links se fornecidos
    if (options.links) {
        setTimeout(() => {
            footer.updateLinks(options.links);
        }, 100);
    }

    return footer;
}

// Exporta para uso em módulos (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FooterComponent, loadFooter };
}