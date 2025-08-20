<<<<<<< HEAD
// Inicializar os dados do usuário e histórico de doações
const userData = {
    orgName: "Nome da Pessoa",
    email: "pessoa@email.com",
    password: "12345678C@",
    phone: "(11) 91234-5678",
    cnpj: "12.345.678/0001-90", // Adicionado campo CNPJ para consistência
    profileImage: "https://via.placeholder.com/80" // Placeholder inicial
};

=======
// Keep the donation history array as requested
>>>>>>> bf9ee4e69ae8aa04dd4f638a2729dc1bd22bf4a6
const donationHistory = [
    {
        date: "14/11/2024",
        items: [
            { type: "Roupas", details: "(X femininas, X masculinas)" },
            { type: "Calçados", details: "(X femininas, X masculinas)" },
            { type: "Produtos de higiene", details: "" }
        ]
    },
    {
        date: "26/10/2024",
        items: [
            { type: "Brinquedos", details: "" },
            { type: "Alimentos", details: "(não perecíveis)" },
            { type: "Produtos de limpeza", details: "" }
        ]
    }
];

<<<<<<< HEAD
// Aguardar o carregamento completo do DOM para manipular os elementos
document.addEventListener("DOMContentLoaded", function() {

    // --- Elementos DOM ---
    const editModal = document.getElementById("edit-modal");
    const photoModal = document.getElementById("photo-modal");
    const passwordDots = document.querySelector(".password-dots");
    let isPasswordVisible = false;

    // --- Funções de UI ---

    // Função para atualizar a imagem no header (se houver um header com essa estrutura)
    function updateHeaderImage(imageUrl) {
        const userPhoto = document.getElementById("userPhoto"); // Assumindo que existe no header
        const userIcon = document.getElementById("userIcon");   // Assumindo que existe no header
      
        if (userPhoto) {
            userPhoto.src = imageUrl;
            userPhoto.style.display = "inline-block";
            
            if (userIcon) {
                userIcon.style.display = "none";
            }
        }
    }

    // Atualizar a interface do usuário com os dados
    function updateUI() {
        document.getElementById("org-name").textContent = userData.orgName;
        document.getElementById("institution-name").textContent = userData.orgName;
        document.getElementById("email").textContent = userData.email;
        document.getElementById("cnpj").textContent = validadores.formatarCNPJ(userData.cnpj);
        document.getElementById("phone").textContent = validadores.formatarTelefone(userData.phone);
        document.getElementById("profile-image").src = userData.profileImage;
        
        updateHeaderImage(userData.profileImage);
        
        // Atualizar campos do formulário de edição
        document.getElementById("edit-institution-name").value = userData.orgName;
        document.getElementById("edit-email").value = userData.email;
        document.getElementById("edit-password").value = userData.password;
        document.getElementById("edit-cnpj").value = validadores.formatarCNPJ(userData.cnpj);
        document.getElementById("edit-phone").value = validadores.formatarTelefone(userData.phone);

        // Atualizar visualização da senha (pontos)
        if (passwordDots) {
            passwordDots.textContent = "••••••••";
        }
    }

    // --- Funções de Modal ---

    // Abrir modal de edição
    window.openEditModal = function() {
        if (editModal) {
            editModal.style.display = "flex";
            document.body.style.overflow = "hidden";
        }
    }

    // Fechar modal de edição
    window.closeEditModal = function() {
        if (editModal) {
            editModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    // Salvar alterações do formulário de edição
    window.saveChanges = function() {
        if (validarFormulario()) {
            // Atualizar os dados do usuário com os valores formatados
            userData.orgName = document.getElementById("edit-institution-name").value;
            userData.email = document.getElementById("edit-email").value;
            userData.password = document.getElementById("edit-password").value;
            userData.cnpj = document.getElementById("edit-cnpj").value.replace(/\D/g, ''); // Salvar CNPJ sem formatação
            userData.phone = document.getElementById("edit-phone").value.replace(/\D/g, ''); // Salvar telefone sem formatação
            
            updateUI();
            closeEditModal();
        }
    }

    // Abrir modal de foto
    window.openPhotoModal = function() {
        if (photoModal) {
            photoModal.style.display = "flex";
            document.body.style.overflow = "hidden";
        }
    }

    // Fechar modal de foto
    window.closePhotoModal = function() {
        if (photoModal) {
            photoModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    // Salvar nova foto de perfil
    window.savePhoto = function() {
        const fileInput = document.getElementById("photo-upload");
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const newImageUrl = e.target.result;
                userData.profileImage = newImageUrl;
                document.getElementById("profile-image").src = newImageUrl;
                updateHeaderImage(newImageUrl);
            };
            
            reader.readAsDataURL(fileInput.files[0]);
        }
        
        closePhotoModal();
    }

    // --- Validadores e Formatadores ---
    const validadores = {
        validarNome: (nome) => {
            if (!nome || nome.trim().length < 3) return { valido: false, mensagem: "O nome deve ter pelo menos 3 caracteres." };
            if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s.,'-]+$/.test(nome)) return { valido: false, mensagem: "O nome contém caracteres não permitidos." };
            return { valido: true };
        },
        validarEmail: (email) => {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { valido: false, mensagem: "Formato de e-mail inválido." };
            return { valido: true };
        },
        validarSenha: (senha) => {
            if (senha.length < 8) return { valido: false, mensagem: "A senha deve ter no mínimo 8 caracteres." };
            if (!/[A-Z]/.test(senha)) return { valido: false, mensagem: "A senha deve conter pelo menos uma letra maiúscula." };
            if (!/\d/.test(senha)) return { valido: false, mensagem: "A senha deve conter pelo menos um número." };
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) return { valido: false, mensagem: "A senha deve conter um caractere especial." };
            return { valido: true };
        },
        validarCNPJ: (cnpj) => {
            cnpj = cnpj.replace(/[^\d]+/g, '');
            if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return { valido: false, mensagem: "CNPJ inválido." };
            let tamanho = cnpj.length - 2;
            let numeros = cnpj.substring(0, tamanho);
            const digitos = cnpj.substring(tamanho);
            let soma = 0;
            let pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }
            let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0)) return { valido: false, mensagem: "CNPJ inválido." };
            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1)) return { valido: false, mensagem: "CNPJ inválido." };
            return { valido: true };
        },
        validarTelefone: (telefone) => {
            const numeroLimpo = telefone.replace(/\D/g, '');
            if (numeroLimpo.length < 10 || numeroLimpo.length > 11) return { valido: false, mensagem: "O telefone deve ter 10 ou 11 dígitos." };
            return { valido: true };
        },
        formatarCNPJ: (cnpj) => {
            const cnpjLimpo = (cnpj || '').replace(/\D/g, '');
            return cnpjLimpo.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
        },
        formatarTelefone: (telefone) => {
            const telLimpo = (telefone || '').replace(/\D/g, '');
            if (telLimpo.length === 11) return telLimpo.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
            return telLimpo.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
        }
    };

    // --- Lógica de Validação do Formulário ---
    function mostrarModalErro(mensagem) {
        const modalBody = document.getElementById('erroSenhaModalBody');
        const erroModalElement = document.getElementById('erroSenhaModal');
        if (modalBody && erroModalElement) {
            modalBody.textContent = mensagem;
            const erroModal = new bootstrap.Modal(erroModalElement);
            erroModal.show();
        } else {
            alert(mensagem);
        }
    }
    
    function validarFormulario() {
        const campos = [
            { id: "edit-institution-name", validador: validadores.validarNome },
            { id: "edit-email", validador: validadores.validarEmail },
            { id: "edit-password", validador: validadores.validarSenha },
            { id: "edit-cnpj", validador: validadores.validarCNPJ },
            { id: "edit-phone", validador: validadores.validarTelefone }
        ];

        for (const campo of campos) {
            const input = document.getElementById(campo.id);
            const resultado = campo.validador(input.value);
            if (!resultado.valido) {
                mostrarModalErro(resultado.mensagem);
                input.focus();
                return false;
            }
        }
        return true;
    }

    // --- Histórico de Doações ---
    function createDonationHistoryElement() {
        const card = document.createElement('div');
        card.className = 'profile-card donation-history-card';
        
        card.innerHTML = `
            <div class="section-title">
                <span>Histórico de doações</span>
            </div>
            <div class="donation-list"></div>
        `;
        
        const donationList = card.querySelector('.donation-list');
        
        donationHistory.forEach(donation => {
            const donationItem = document.createElement('div');
            donationItem.className = 'donation-item';
            
            const itemsHtml = donation.items.map(item => 
                `<li><span class="item-type">X ${item.type}</span> ${item.details || ''}</li>`
            ).join('');

            donationItem.innerHTML = `
                <h3 class="donation-date">${donation.date}</h3>
                <ul class="donation-items">${itemsHtml}</ul>
            `;
            donationList.appendChild(donationItem);
        });
        
        return card;
    }

    function addDonationHistoryToPage() {
        const container = document.querySelector('.container');
        if (container) {
            const historyElement = createDonationHistoryElement();
            container.appendChild(historyElement);
        }
    }
    
    // --- Configuração de Event Listeners ---
    function setupEventListeners() {
        // Toggle de visibilidade de senha no modal
        const toggleEditPassword = document.getElementById("toggle-edit-password");
        const editPasswordField = document.getElementById("edit-password");
        if (toggleEditPassword && editPasswordField) {
            toggleEditPassword.addEventListener("click", function() {
                const type = editPasswordField.type === "password" ? "text" : "password";
                editPasswordField.type = type;
                this.querySelector('span').textContent = type === "password" ? "visibility" : "visibility_off";
            });
        }

        // Verificação de senha em tempo real
        const passwordInput = document.getElementById("edit-password");
        if (passwordInput) {
            passwordInput.addEventListener("input", function() {
                const senha = this.value;
                document.getElementById("check-length").classList.toggle("valid", senha.length >= 8);
                document.getElementById("check-uppercase").classList.toggle("valid", /[A-Z]/.test(senha));
                document.getElementById("check-number").classList.toggle("valid", /\d/.test(senha));
                document.getElementById("check-special").classList.toggle("valid", /[!@#$%^&*(),.?":{}|<>]/.test(senha));
            });
        }

        // Máscaras de input
        const cnpjInput = document.getElementById('edit-cnpj');
        if (cnpjInput) {
            cnpjInput.addEventListener('input', (e) => {
                e.target.value = validadores.formatarCNPJ(e.target.value);
            });
        }

        const phoneInput = document.getElementById('edit-phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                e.target.value = validadores.formatarTelefone(e.target.value);
            });
        }
    }
    
    // --- Inicialização ---
    function init() {
        // Adicionar link para Material Symbols dinamicamente
        if (!document.querySelector('link[href*="material-symbols"]')) {
            const materialIconsLink = document.createElement('link');
            materialIconsLink.rel = 'stylesheet';
            materialIconsLink.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0';
            document.head.appendChild(materialIconsLink);
        }
        
        updateUI();
        addDonationHistoryToPage();
        setupEventListeners();
    }

    init(); 
=======
// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {

    // --- 1. DOM Element References ---
    // Grouping all element selections here for easy management.
    const elements = {
        // User Info Display
        orgNameHeader: document.querySelector('.profile-name #org-name'),
        userNameHeaderSpan: document.querySelector('.profile-dropdown button span'),
        institutionNameDisplay: document.getElementById('institution-name'),
        emailDisplay: document.getElementById('email'),
        cnpjDisplay: document.getElementById('cnpj'),
        phoneDisplay: document.getElementById('phone'),

        // Modals
        editModal: document.getElementById('edit-modal'),
        photoModal: document.getElementById('photo-modal'),
        instagramModal: document.getElementById('caixa-principal'),
        facebookModal: document.getElementById('caixa-principal2'),
        errorModal: new bootstrap.Modal(document.getElementById('erroSenhaModal')),
        errorModalBody: document.getElementById('erroSenhaModalBody'),

        // Edit Modal Form Fields
        editInstitutionNameInput: document.getElementById('edit-institution-name'),
        editEmailInput: document.getElementById('edit-email'),
        editPasswordInput: document.getElementById('edit-password'),
        editCnpjInput: document.getElementById('edit-cnpj'),
        editPhoneInput: document.getElementById('edit-phone'),
        
        // Photo Modal
        profileImage: document.getElementById('profile-image'),
        headerUserPhoto: document.getElementById('userPhoto'),
        headerUserIcon: document.getElementById('userIcon'),
        photoUploadInput: document.getElementById('photo-upload'),

        // Password Helpers
        toggleEditPasswordBtn: document.getElementById('toggle-edit-password'),
        passwordChecklist: {
            length: document.getElementById('check-length'),
            uppercase: document.getElementById('check-uppercase'),
            number: document.getElementById('check-number'),
            special: document.getElementById('check-special')
        },
        
        // Sidebar
        sidebar: document.getElementById('sidebar'),
        sidebarToggler: document.getElementById('icone2'),

        // Social Media Modals
        instagramBtn: document.getElementById('botao'),
        facebookBtn: document.getElementById('facebook'),
        closeInstagramBtn: document.getElementById('botao-sair'),
        closeFacebookBtn: document.getElementById('botao-sair2')
    };

    // --- 2. State Management ---
    // A central object to hold the user's data.
    let userData = {
        name: "Maria da Silva",
        email: "mariadasilva@gmail.com",
        cnpj: "Não aplicável", // CNPJ is for companies, profile is for a person
        phone: "(71) 99999-8888",
        password: "DefaultPassword123!", // This should be handled securely in a real app
        profilePicUrl: "" // Default is empty, so the icon shows
    };

    // --- 3. Core Functions ---

    /**
     * Updates all displayed user information on the page.
     */
    function updateDOM() {
        elements.orgNameHeader.textContent = userData.name;
        elements.userNameHeaderSpan.textContent = userData.name;
        elements.institutionNameDisplay.textContent = userData.name;
        elements.emailDisplay.textContent = userData.email;
        elements.cnpjDisplay.textContent = userData.cnpj;
        elements.phoneDisplay.textContent = userData.phone;
        
        // Update profile picture in header and main card
        if (userData.profilePicUrl) {
            elements.profileImage.src = userData.profilePicUrl;
            elements.headerUserPhoto.src = userData.profilePicUrl;
            elements.headerUserPhoto.style.display = 'inline';
            elements.headerUserIcon.style.display = 'none';
        } else {
            elements.headerUserPhoto.style.display = 'none';
            elements.headerUserIcon.style.display = 'inline';
        }
    }
    
    /**
     * Renders the donation history section from the `donationHistory` array.
     */
    function renderDonationHistory() {
        const container = document.querySelector('.container');
        if (!container) return;

        const historyCard = document.createElement('div');
        historyCard.className = 'profile-card donation-history-card';

        const title = document.createElement('div');
        title.className = 'section-title';
        title.innerHTML = `<span>Histórico de Doações</span>`;
        
        const listContainer = document.createElement('div');
        listContainer.className = 'donation-list';

        donationHistory.forEach(donation => {
            const donationDiv = document.createElement('div');
            
            const dateP = document.createElement('p');
            dateP.className = 'donation-date';
            dateP.textContent = donation.date;
            
            const itemsUl = document.createElement('ul');
            itemsUl.className = 'donation-items';
            
            donation.items.forEach(item => {
                const itemLi = document.createElement('li');
                itemLi.innerHTML = `<span class="item-type">${item.type}:</span>&nbsp;${item.details}`;
                itemsUl.appendChild(itemLi);
            });
            
            donationDiv.appendChild(dateP);
            donationDiv.appendChild(itemsUl);
            listContainer.appendChild(donationDiv);
        });

        historyCard.appendChild(title);
        historyCard.appendChild(listContainer);
        
        const personalInfoCard = container.querySelectorAll('.profile-card')[1];
        personalInfoCard.insertAdjacentElement('afterend', historyCard);
    }
    
    /**
     * Checks the password input against validation criteria in real-time.
     * @returns {boolean} - True if all password criteria are met.
     */
    function validatePassword() {
        const password = elements.editPasswordInput.value;
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        
        let allValid = true;
        for (const [key, isValid] of Object.entries(checks)) {
            const checkItem = elements.passwordChecklist[key];
            if (isValid) {
                checkItem.classList.add('valid');
            } else {
                checkItem.classList.remove('valid');
                allValid = false;
            }
        }
        return allValid;
    }

    // --- 4. Event Listener Setup ---
    function setupEventListeners() {
        // Password visibility toggle in edit modal
        elements.toggleEditPasswordBtn.addEventListener('click', () => {
            const input = elements.editPasswordInput;
            const icon = elements.toggleEditPasswordBtn.querySelector('span');
            if (input.type === 'password') {
                input.type = 'text';
                icon.textContent = 'visibility_off'; // Icon for visible password
            } else {
                input.type = 'password';
                icon.textContent = 'visibility'; // Icon for hidden password
            }
        });

        // Live password validation on input
        elements.editPasswordInput.addEventListener('input', validatePassword);
        
        // Sidebar toggle button (for mobile)
        elements.sidebarToggler.addEventListener('click', () => {
             window.toggleSidebar();
        });

        // --- NEW: Sidebar hover effect for desktop to push content ---
        const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');
        if (desktopMediaQuery.matches) {
            elements.sidebar.addEventListener('mouseenter', () => {
                document.body.classList.add('sidebar-expanded');
            });
            elements.sidebar.addEventListener('mouseleave', () => {
                document.body.classList.remove('sidebar-expanded');
            });
        }

        // Social media modal buttons
        elements.instagramBtn.addEventListener('click', () => {
            elements.instagramModal.style.display = 'flex';
        });
        elements.facebookBtn.addEventListener('click', () => {
            elements.facebookModal.style.display = 'flex';
        });
        elements.closeInstagramBtn.addEventListener('click', () => {
            elements.instagramModal.style.display = 'none';
        });
        elements.closeFacebookBtn.addEventListener('click', () => {
            elements.facebookModal.style.display = 'none';
        });
    }

    // --- 5. Global Functions for HTML `onclick` attributes ---
    // These functions are attached to the `window` object to be accessible from the HTML.

    // Edit Info Modal
    window.openEditModal = function() {
        elements.editInstitutionNameInput.value = userData.name;
        elements.editEmailInput.value = userData.email;
        elements.editCnpjInput.value = userData.cnpj;
        elements.editPhoneInput.value = userData.phone;
        elements.editPasswordInput.value = ""; // Clear password for security
        validatePassword(); // Reset checklist styling
        // --- MODIFIED: Use 'flex' to enable centering via CSS ---
        elements.editModal.style.display = 'flex';
    }

    window.closeEditModal = function() {
        elements.editModal.style.display = 'none';
    }

    window.saveChanges = function() {
        // Validate password only if the user has typed a new one
        if (elements.editPasswordInput.value !== "" && !validatePassword()) {
            elements.errorModalBody.textContent = 'A nova senha não atende a todos os critérios de segurança. Por favor, corrija-a para salvar.';
            elements.errorModal.show();
            return;
        }

        // Update user data object with values from the form
        userData.name = elements.editInstitutionNameInput.value;
        userData.email = elements.editEmailInput.value;
        userData.cnpj = elements.editCnpjInput.value;
        userData.phone = elements.editPhoneInput.value;
        if (elements.editPasswordInput.value) {
            userData.password = elements.editPasswordInput.value;
        }
        
        updateDOM(); // Refresh the page with new data
        closeEditModal();
    }

    // Edit Photo Modal
    window.openPhotoModal = function() {
        elements.photoUploadInput.value = ''; // Reset file input
        // --- MODIFIED: Use 'flex' to enable centering via CSS ---
        elements.photoModal.style.display = 'flex';
    }

    window.closePhotoModal = function() {
        elements.photoModal.style.display = 'none';
    }

    window.savePhoto = function() {
        const file = elements.photoUploadInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                userData.profilePicUrl = imageUrl;
                updateDOM(); // Refresh images on the page
                closePhotoModal();
            }
            reader.readAsDataURL(file);
        } else {
            // Close even if no file was selected
            closePhotoModal();
        }
    }

    // Sidebar
    window.toggleSidebar = function() {
        // --- MODIFIED: Toggles classes on sidebar and body for better control ---
        elements.sidebar.classList.toggle('open');
        document.body.classList.toggle('sidebar-open');
    }
    
    // Social Media Links (simple implementation)
    window.gerarLinkInstagram = function() {
        const username = document.getElementById('instagram').value;
        if (username) {
            alert(`Instagram "${username}" salvo com sucesso!`);
            elements.instagramModal.style.display = 'none';
        } else {
            alert('Por favor, insira um nome de usuário.');
        }
    }

    window.gerarLinkFacebook = function() {
        const username = document.getElementById('facebook2').value;
        if (username) {
            alert(`Facebook "${username}" salvo com sucesso!`);
            elements.facebookModal.style.display = 'none';
        } else {
            alert('Por favor, insira um nome de usuário.');
        }
    }
    
    // --- 6. Initialization ---
    // This is the entry point that runs when the page loads.
    function initializeProfile() {
        updateDOM();
        renderDonationHistory();
        setupEventListeners();
    }
    
    initializeProfile();
>>>>>>> bf9ee4e69ae8aa04dd4f638a2729dc1bd22bf4a6
});