// Keep the donation history array as requested
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
});