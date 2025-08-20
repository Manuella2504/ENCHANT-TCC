// Inicializar os dados do usuário e histórico de doações
const userData = {
    orgName: "Nome da Pessoa",
    email: "pessoa@email.com",
    password: "12345678C@",
    phone: "(11) 91234-5678",
    cnpj: "12.345.678/0001-90", // Adicionado campo CNPJ para consistência
    profileImage: "https://via.placeholder.com/80" // Placeholder inicial
};

const donationHistory = [
    {
        date: "14/11/2024",
        items: [
            { type: "roupas", details: "(X femininas, X masculinas)" },
            { type: "calçados", details: "(X femininas, X masculinas)" },
            { type: "produtos de higiene", details: "" }
        ]
    },
    {
        date: "26/10/2024",
        items: [
            { type: "brinquedos", details: "" },
            { type: "alimentos", details: "(não perecíveis)" },
            { type: "produtos de limpeza", details: "" }
        ]
    }
];

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
});