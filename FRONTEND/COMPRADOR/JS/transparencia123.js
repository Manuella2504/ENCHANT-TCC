// Dados armazenados em memória para simular upload
let uploadedData = {
    reports: [],
    contracts: [],
    audits: [],
    documents: [],
    financial: [],
    partnerships: []
};

// Configurações de validação para cada tipo de formulário
const validationRules = {
     reports: {
        title: { min: 10, max: 150, required: true },
        description: { min: 20, max: 1000, required: true },
        file: { required: true, maxSize: 10, allowedTypes: ['.pdf', '.doc', '.docx', '.xls', '.xlsx'] }
    },
    contracts: {
        title: { min: 10, max: 200, required: true },
        description: { min: 20, max: 2000, required: true },
        year: { required: true },
        file: { required: true, maxSize: 15, allowedTypes: ['.pdf', '.doc', '.docx'] }
    },
    audits: {
        title: { min: 20, max: 200, required: true },
        date: { required: true },
        type: { required: true },
        status: { required: true },
        file: { required: true, maxSize: 20, allowedTypes: ['.pdf', '.doc', '.docx'] }
    },
    documents: {
        title: { min: 10, max: 150, required: true },
        description: { min: 30, max: 800, required: true },
        file: { required: true, maxSize: 5, allowedTypes: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'] }
    },
    financial: {
        title: { min: 15, max: 200, required: true },
        period: { min: 5, max: 50, required: true },
        description: { min: 50, max: 1500, required: true },
        file: { required: true, maxSize: 15, allowedTypes: ['.pdf', '.xls', '.xlsx'] }
    },
    partnerships: {
        title: { min: 20, max: 250, required: true },
        organization: { min: 5, max: 100, required: true },
        description: { min: 100, max: 2000, required: true },
        start: { required: true },
        file: { required: true, maxSize: 10, allowedTypes: ['.pdf', '.doc', '.docx'] }
    }
};

// Função para mostrar mensagens no modal existente
function showModalMessage(title, message, isError = false) {
    const modal = document.getElementById('erroSenhaModal');
    const modalTitle = document.getElementById('erroSenhaModalLabel');
    const modalBody = document.getElementById('erroSenhaModalBody');
    const modalButton = document.getElementById('botao-validar');
    
    // Configurar título baseado no tipo de mensagem
    modalTitle.textContent = isError ? 'Erro de Validação' : 'Sucesso';
    
    // Configurar mensagem
    modalBody.innerHTML = `<p style="margin: 0; ${isError ? 'color: #dc3545;' : 'color: #28a745;'}">${message}</p>`;
    
    // Configurar botão
    modalButton.textContent = isError ? 'Entendi' : 'OK';
    modalButton.className = isError ? 'btn btn-danger' : 'btn btn-success';
    
    // Mostrar modal usando Bootstrap
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}



    // Configurar todos os formulários com validação
   setupForm('reports', ['title', 'description', 'file']);
setupRealTimeValidation();
setupDragAndDrop();
updateList('reports');
   // Apenas para contratos:
setupForm('contracts', ['title', 'description', 'year', 'file']);
setupRealTimeValidation();
setupDragAndDrop();
updateList('contracts');

   setupForm('audits', ['title', 'date', 'type', 'status', 'file']);
    setupRealTimeValidation();
    setupDragAndDrop();
    updateList('audits');
    setupModal();


function setupModal() {
    const modal = document.getElementById('descriptionModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

function showDescription(type, id) {
    const item = uploadedData[type].find(item => item.id === id);
    if (!item) return;

    const modal = document.getElementById('descriptionModal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    modal.style.display = 'block';
}

function setupRealTimeValidation() {
    const allInputs = document.querySelectorAll('input, textarea, select');
   
    allInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSingleField(this);
        });
       
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    // Validação especial para arquivos
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            validateFileField(this);
        });
    });
}

function validateSingleField(field) {
    const fieldId = field.id;
    const parts = fieldId.split('-');
    const type = parts[0] + 's'; // reports, contracts, etc.
    const fieldName = parts.slice(1).join('-'); // title, description, etc.
   
    if (!validationRules[type] || !validationRules[type][fieldName]) return;
   
    const rules = validationRules[type][fieldName];
    const value = field.value.trim();
   
    let isValid = true;
    let errorMessage = '';
   
    // Validação de campo obrigatório
    if (rules.required && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório.';
    }
    // Validação de tamanho mínimo
    else if (rules.min && value.length < rules.min) {
        isValid = false;
        errorMessage = `Mínimo de ${rules.min} caracteres. Atual: ${value.length}`;
    }
    // Validação de tamanho máximo
    else if (rules.max && value.length > rules.max) {
        isValid = false;
        errorMessage = `Máximo de ${rules.max} caracteres. Atual: ${value.length}`;
    }
    // Validações específicas
    else if (fieldName === 'date') {
        const selectedDate = new Date(value);
        const today = new Date();
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(today.getFullYear() - 5);
       
        if (selectedDate > today) {
            isValid = false;
            errorMessage = 'A data não pode ser futura.';
        } else if (selectedDate < fiveYearsAgo) {
            isValid = false;
            errorMessage = 'A data não pode ser anterior a 5 anos.';
        }
    }
    else if (fieldName === 'start') {
        const selectedDate = new Date(value);
        const today = new Date();
       
        if (selectedDate > today) {
            isValid = false;
            errorMessage = 'A data de início não pode ser futura.';
        }
    }
    else if (fieldName === 'title') {
        // Validar caracteres especiais excessivos
        const specialCharsCount = (value.match(/[^a-zA-Z0-9\sÀ-ÿ\-]/g) || []).length;
        if (specialCharsCount > 3) {
            isValid = false;
            errorMessage = 'Evite usar muitos caracteres especiais no título.';
        }
    }
   
    // Aplicar estilo visual
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
        hideFieldError(fieldId);
    } else {
        field.classList.remove('valid');
        field.classList.add('error');
        showFieldError(fieldId, errorMessage);
    }
   
    return isValid;
}

function validateFileField(fileInput) {
    const fieldId = fileInput.id;
    const parts = fieldId.split('-');
    const type = parts[0] + 's';
    const fieldName = 'file';
   
    if (!validationRules[type] || !validationRules[type][fieldName]) return;
   
    const rules = validationRules[type][fieldName];
    const file = fileInput.files[0];
    const fileUploadDiv = fileInput.closest('.file-upload');
   
    let isValid = true;
    let errorMessage = '';
   
    if (rules.required && !file) {
        isValid = false;
        errorMessage = 'Por favor, selecione um arquivo.';
    } else if (file) {
        // Validar tamanho do arquivo
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > rules.maxSize) {
            isValid = false;
            errorMessage = `Arquivo muito grande. Máximo: ${rules.maxSize}MB. Atual: ${fileSizeMB.toFixed(1)}MB`;
        }
       
        // Validar tipo do arquivo
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!rules.allowedTypes.includes(fileExtension)) {
            isValid = false;
            errorMessage = `Tipo de arquivo não permitido. Aceitos: ${rules.allowedTypes.join(', ')}`;
        }
       
        // Validar nome do arquivo
        if (file.name.length > 100) {
            isValid = false;
            errorMessage = 'Nome do arquivo muito longo (máximo 100 caracteres).';
        }
    }
   
    // Aplicar estilo visual
    if (isValid) {
        fileUploadDiv.classList.remove('error');
        fileUploadDiv.classList.add('valid');
        hideFieldError(fieldId);
        if (file) {
            updateFileUploadDisplay(fileUploadDiv, file.name);
        }
    } else {
        fileUploadDiv.classList.remove('valid');
        fileUploadDiv.classList.add('error');
        showFieldError(fieldId, errorMessage);
    }
   
    return isValid;
}

function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function hideFieldError(fieldId) {
    const errorElement = document.getElementById(fieldId + '-error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function clearFieldError(field) {
    if (field.classList.contains('error')) {
        field.classList.remove('error');
        hideFieldError(field.id);
    }
}

function validateForm(type) {
    const form = document.getElementById(`${type}-form`);
    const inputs = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    let errors = [];

    // Validar cada campo
    inputs.forEach(input => {
        const fieldValid = input.type === 'file' ?
            validateFileField(input) :
            validateSingleField(input);
       
        if (!fieldValid) {
            isFormValid = false;
            const fieldName = input.id.split('-').slice(1).join(' ');
            errors.push(fieldName);
        }
    });

    // Validar duplicatas
    const titleField = form.querySelector(`#${type.slice(0, -1)}-title`);
    if (titleField && titleField.value.trim()) {
        const isDuplicate = uploadedData[type].some(item =>
            item.title.toLowerCase() === titleField.value.trim().toLowerCase()
        );
       
        if (isDuplicate) {
            isFormValid = false;
            showFieldError(titleField.id, 'Já existe um item com este título.');
            titleField.classList.add('error');
            errors.push('título duplicado');
        }
    }

    return { isValid: isFormValid, errors };
}

function setupForm(type, fields) {
    const form = document.getElementById(`${type}-form`);
   
    form.addEventListener('submit', function(e) {
        e.preventDefault();
       
        // Validar formulário completo
        const validation = validateForm(type);
       
        if (!validation.isValid) {
            const errorMessage = `Por favor, corrija os seguintes campos: ${validation.errors.join(', ')}`;
            showModalMessage('Erro de Validação', errorMessage, true);
           
            // Focar no primeiro campo com erro
            const firstErrorField = form.querySelector('.error');
            if (firstErrorField) {
                firstErrorField.focus();
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
       
        // Coletar dados do formulário
        const formData = {};
        fields.forEach(field => {
            const element = document.getElementById(`${type.slice(0, -1)}-field`);
            if (field === 'file') {
                const file = element.files[0];
                formData[field] = file ? file.name : '';
                formData.fileSize = file ? (file.size / (1024 * 1024)).toFixed(2) + 'MB' : '';
            } else {
                formData[field] = element.value.trim();
            }
        });
       
        // Adicionar metadados
        formData.id = Date.now();
        formData.timestamp = new Date().toLocaleDateString('pt-BR');
        formData.uploadTime = new Date().toLocaleString('pt-BR');
       
        // Validações finais específicas por tipo
        if (type === 'audits') {
            // Verificar coerência entre status e tipo de auditoria
            if (formData.status === 'approved' && formData.type === 'externa' && !formData.title.toLowerCase().includes('externa')) {
                showModalMessage('Atenção', 'Verifique se o título condiz com o tipo de auditoria externa aprovada.', true);
                return;
            }
        }
       
        if (type === 'contracts') {
            // Verificar se o ano no título condiz com o ano selecionado
            const titleYear = formData.title.match(/20\d{2}/);
            if (titleYear && titleYear[0] !== formData.year) {
                if (!confirm(`O ano no título (${titleYear[0]}) não coincide com o ano selecionado (${formData.year}). Deseja continuar?`)) {
                    return;
                }
            }
        }

        if (type === 'financial') {
            // Verificar se o período está no formato adequado
            const periodRegex = /\d{4}|\d{1,2}º?\s*(trimestre|semestre|bimestre)/i;
            if (!periodRegex.test(formData.period)) {
                showModalMessage('Erro de Validação', 'O período deve incluir ano ou especificar trimestre/semestre (ex: "1º Trimestre 2024").', true);
                return;
            }
        }
       
        // Adicionar aos dados
        uploadedData[type].push(formData);
       
        // Mostrar mensagem de sucesso
        const successMessage = getSuccessMessage(type, formData);
        showModalMessage('Sucesso', successMessage, false);
       
        // Limpar formulário e resetar validações
        resetForm(form);
       
        // Atualizar lista
        updateList(type);
    });
}

function getSuccessMessage(type, data) {
    const messages = {
        reports: `Relatório "${data.title}" foi adicionado com sucesso e está disponível para consulta pública.`,
        contracts: `Contrato "${data.title}" foi publicado na seção de transparência.`,
        audits: `Auditoria "${data.title}" foi registrada com status "${getStatusText(data.status)}".`,
        documents: `Documento "${data.title}" foi adicionado aos documentos comprobatórios.`,
        financial: `Relatório financeiro "${data.title}" do período ${data.period} foi publicado.`,
        partnerships: `Parceria "${data.title}" com ${data.organization} foi registrada.`
    };
    return messages[type] || 'Item adicionado com sucesso!';
}

function resetForm(form) {
    form.reset();
   
    // Remover classes de validação
    const fields = form.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
        field.classList.remove('error', 'valid');
        hideFieldError(field.id);
    });
   
    // Resetar file uploads
    const fileUploads = form.querySelectorAll('.file-upload');
    fileUploads.forEach(upload => {
        upload.classList.remove('error', 'valid');
        const p = upload.querySelector('p');
        const originalText = upload.querySelector('small').textContent;
        p.textContent = 'Clique para selecionar o arquivo ou arraste aqui';
        upload.style.borderColor = '#ddd';
        upload.style.backgroundColor = '';
    });
   
    // Remover mensagens de edição
    const editMessage = form.querySelector('.edit-message');
    if (editMessage) {
        editMessage.style.display = 'none';
    }
   
    // Resetar botão
    const submitBtn = form.querySelector('.upload-btn');
    const originalText = submitBtn.textContent.replace('Salvar Alterações', 'Adicionar');
    submitBtn.textContent = originalText;
}

function updateList(type) {
    const listContainer = document.getElementById(`${type}-list`);
    const items = uploadedData[type];
   
    // Limpar lista atual (manter apenas o título)
    const title = listContainer.querySelector('h3');
    listContainer.innerHTML = '';
    listContainer.appendChild(title);
   
    if (items.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Nenhum item adicionado ainda.';
        emptyMessage.style.cssText = 'color: #666; font-style: italic; text-align: center; padding: 20px;';
        listContainer.appendChild(emptyMessage);
        return;
    }
   
    // Ordenar por data de upload (mais recente primeiro)
    const sortedItems = [...items].sort((a, b) => b.id - a.id);
   
    // Criar visualização baseada no tipo
    if (type === 'reports') {
        createCardsView(listContainer, sortedItems, type);
    } else if (type === 'contracts') {
        createDocumentsView(listContainer, sortedItems, type);
    } else if (type === 'audits') {
        createAuditsView(listContainer, sortedItems, type);
    } else {
        createCardsView(listContainer, sortedItems, type);
    }
}

function createCardsView(container, items, type) {
    const cardsGrid = document.createElement('div');
    cardsGrid.className = 'cards-grid';
   
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
       
        card.innerHTML = `
            <h3>${item.title}</h3>
            <div class="card-description">
                ${item.description.length > 80 ? item.description.substring(0, 80) + '...' : item.description}
            </div>
            <div class="card-meta">
                <div>Publicado em: ${item.timestamp}</div>
                ${item.fileSize ? `<div>Tamanho: ${item.fileSize}</div>` : ''}
            </div>
            <div class="card-actions">
                <button class="download-btn" onclick="downloadFile('${type}', ${item.id})">
                    <svg class="icon" viewBox="0 0 24 24" style="width: 16px; height: 16px;">
                        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" fill="currentColor"/>
                    </svg>
                    Download
                </button>
                <button class="view-description-btn" onclick="showDescription('${type}', ${item.id})">
                    <svg class="icon" viewBox="0 0 24 24" style="width: 16px; height: 16px;">
                        <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" fill="currentColor"/>
                    </svg>
                    Ver descrição
                </button>
                <button class="edit-btn" onclick="editItem('${type}', ${item.id})">Editar</button>
                <button class="delete-btn" onclick="deleteItem('${type}', ${item.id})">Excluir</button>
            </div>
        `;
       
        cardsGrid.appendChild(card);
    });
   
    container.appendChild(cardsGrid);
}

function createDocumentsView(container, items, type) {
    const documentsList = document.createElement('div');
    documentsList.className = 'documents-list';
   
    items.forEach(item => {
        const documentItem = document.createElement('div');
        documentItem.className = 'document-item';
       
        documentItem.innerHTML = `
            <div class="document-header">
                <div class="document-info">
                    <h3>${item.title}</h3>
                    <div class="document-description">
                        ${item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description}
                    </div>
                    <div class="document-meta">Publicado em: ${item.timestamp} | Tamanho: ${item.fileSize || 'N/A'}</div>
                </div>
                <div class="document-actions">
                    <span class="file-size">${item.year || '2024'}</span>
                </div>
            </div>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 15px;">
                <button class="download-btn" onclick="downloadFile('${type}', ${item.id})">
                    <svg class="icon" viewBox="0 0 24 24" style="width: 16px; height: 16px;">
                        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" fill="currentColor"/>
                    </svg>
                    Download
                </button>
                <button class="view-description-btn" onclick="showDescription('${type}', ${item.id})">
                    <svg class="icon" viewBox="0 0 24 24" style="width: 16px; height: 16px;">
                        <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" fill="currentColor"/>
                    </svg>
                    Ver descrição
                </button>
                <button class="edit-btn" onclick="editItem('${type}', ${item.id})">Editar</button>
                <button class="delete-btn" onclick="deleteItem('${type}', ${item.id})">Excluir</button>
            </div>
        `;
       
        documentsList.appendChild(documentItem);
    });
   
    container.appendChild(documentsList);
}

function createAuditsView(container, items, type) {
    const auditCards = document.createElement('div');
    auditCards.className = 'audit-cards';
   
    items.forEach(item => {
        const auditCard = document.createElement('div');
        auditCard.className = 'audit-card';
       
        const statusClass = item.status === 'approved' ? 'approved' : 'pending';
        const auditDate = item.date ? new Date(item.date).toLocaleDateString('pt-BR') : 'Data não informada';
       
        auditCard.innerHTML = `
            <h3>${item.title}</h3>
            <div class="audit-meta">
                <span class="audit-date">Data: ${auditDate}</span>
                <div style="margin: 5px 0;">
                    <small style="color: #666;">Tipo: ${getAuditTypeText(item.type)} | Publicado: ${item.timestamp}</small>
                </div>
                <div class="audit-status">
                    <span class="status-label">Status:</span>
                    <span class="status-badge ${statusClass}">${getStatusText(item.status)}</span>
                </div>
            </div>
            <div class="audit-actions">
                <button class="view-report-btn" onclick="viewAuditReport(${item.id})">
                    <svg class="icon" viewBox="0 0 24 24" style="width: 16px; height: 16px;">
                        <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" fill="currentColor"/>
                    </svg>
                    Ver relatório
                </button>
                <button class="audit-download-btn" onclick="downloadFile('${type}', ${item.id})">
                    <svg class="icon" viewBox="0 0 24 24" style="width: 16px; height: 16px;">
                        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" fill="currentColor"/>
                    </svg>
                </button>
                <button class="edit-btn" onclick="editItem('${type}', ${item.id})" style="margin-left: 10px; padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">Editar</button>
                <button class="delete-btn" onclick="deleteItem('${type}', ${item.id})" style="margin-left: 5px; padding: 6px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Excluir</button>
            </div>
        `;
       
        auditCards.appendChild(auditCard);
    });
   
    container.appendChild(auditCards);
}

function getStatusText(status) {
    const statusMap = {
        'approved': 'Aprovado',
        'pending': 'Em andamento',
        'rejected': 'Rejeitado',
        'review': 'Em revisão'
    };
    return statusMap[status] || status;
}

function getAuditTypeText(type) {
    const typeMap = {
        'interna': 'Auditoria Interna',
        'externa': 'Auditoria Externa',
        'revisao': 'Revisão de Processos',
        'compliance': 'Auditoria de Compliance',
        'financeira': 'Auditoria Financeira'
    };
    return typeMap[type] || type;
}

function downloadFile(type, id) {
    const item = uploadedData[type].find(item => item.id === id);
    if (!item) return;
   
    // Simular download
    const fileName = item.file || 'documento.pdf';
    const downloadMessage = `Download iniciado: ${fileName}`;
   
    // Mostrar feedback visual
    const button = event.target.closest('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<span style="color: #28a745;">✓ Baixando...</span>';
    button.disabled = true;
   
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        showModalMessage('Download', downloadMessage, false);
    }, 1500);
}

function viewAuditReport(id) {
    const item = uploadedData.audits.find(item => item.id === id);
    if (!item) return;
   
    // Simular visualização de relatório
    const button = event.target;
    const originalText = button.innerHTML;
    button.style.background = '#28a745';
    button.innerHTML = '<svg class="icon" viewBox="0 0 24 24" style="width: 16px; height: 16px;"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" fill="currentColor"/></svg>Visualizado!';
   
    setTimeout(() => {
        button.style.background = '#8B4513';
        button.innerHTML = originalText;
        showModalMessage('Relatório Visualizado', `Relatório "${item.title}" foi visualizado com sucesso.`, false);
    }, 2000);
}

function editItem(type, id) {
    const item = uploadedData[type].find(item => item.id === id);
    if (!item) return;
   
    // Preencher o formulário com os dados do item
    const formPrefix = type.slice(0, -1); // Removes 's' final
   
    if (type === 'reports') {
        document.getElementById('report-title').value = item.title;
        document.getElementById('report-description').value = item.description;
    } else if (type === 'contracts') {
        document.getElementById('contract-title').value = item.title;
        document.getElementById('contract-description').value = item.description;
        document.getElementById('contract-year').value = item.year;
    } else if (type === 'audits') {
        document.getElementById('audit-title').value = item.title;
        document.getElementById('audit-date').value = item.date;
        document.getElementById('audit-type').value = item.type;
        document.getElementById('audit-status').value = item.status;
    } else if (type === 'documents') {
        document.getElementById('document-title').value = item.title;
        document.getElementById('document-description').value = item.description;
    } else if (type === 'financial') {
        document.getElementById('financial-title').value = item.title;
        document.getElementById('financial-period').value = item.period;
        document.getElementById('financial-description').value = item.description;
    } else if (type === 'partnerships') {
        document.getElementById('partnership-title').value = item.title;
        document.getElementById('partnership-organization').value = item.organization;
        document.getElementById('partnership-description').value = item.description;
        document.getElementById('partnership-start').value = item.start;
    }
   
    // Remover o item atual dos dados
    uploadedData[type] = uploadedData[type].filter(i => i.id !== id);
    updateList(type);
   
    // Rolar para o formulário
    document.getElementById(`${type}-form`).scrollIntoView({ behavior: 'smooth' });
   
    // Mostrar mensagem indicando que está editando
    const form = document.getElementById(`${type}-form`);
    let editMessage = form.querySelector('.edit-message');
    if (!editMessage) {
        editMessage = document.createElement('div');
        editMessage.className = 'edit-message';
        editMessage.style.cssText = 'background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 12px; border-radius: 6px; margin-bottom: 20px;';
        form.insertBefore(editMessage, form.firstChild);
    }
    editMessage.textContent = 'Editando item existente. Faça as alterações necessárias e clique em salvar.';
    editMessage.style.display = 'block';
   
    // Alterar texto do botão
    const submitBtn = form.querySelector('.upload-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = originalText.replace('Adicionar', 'Salvar Alterações');
   
    // Mostrar mensagem de edição no modal
    showModalMessage('Modo de Edição', `Item "${item.title}" carregado para edição. Faça as alterações necessárias no formulário.`, false);
   
    // Remover mensagem após 10 segundos
    setTimeout(() => {
        if (editMessage) {
            editMessage.style.display = 'none';
            submitBtn.textContent = originalText;
        }
    }, 10000);
}

function deleteItem(type, id) {
    const item = uploadedData[type].find(item => item.id === id);
    if (!item) return;
   
    const confirmMessage = `Tem certeza que deseja excluir "${item.title}"?\n\nEsta ação não pode ser desfeita e o documento será removido permanentemente da página de transparência.`;
   
    if (confirm(confirmMessage)) {
        uploadedData[type] = uploadedData[type].filter(item => item.id !== id);
        updateList(type);
       
        // Mostrar mensagem de confirmação no modal
        showModalMessage('Item Excluído', `Item "${item.title}" foi excluído com sucesso.`, false);
    }
}

function setupDragAndDrop() {
    const fileUploads = document.querySelectorAll('.file-upload');
   
    fileUploads.forEach(upload => {
        const input = upload.querySelector('input[type="file"]');
       
        upload.addEventListener('dragover', (e) => {
            e.preventDefault();
            upload.classList.add('dragover');
        });
       
        upload.addEventListener('dragleave', () => {
            upload.classList.remove('dragover');
        });
       
        upload.addEventListener('drop', (e) => {
            e.preventDefault();
            upload.classList.remove('dragover');
           
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                input.files = files;
                validateFileField(input);
            }
        });
       
        input.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                validateFileField(e.target);
            }
        });
    });
}

function updateFileUploadDisplay(upload, fileName) {
    const p = upload.querySelector('p');
    const truncatedName = fileName.length > 50 ?
        fileName.substring(0, 47) + '...' : fileName;
    p.textContent = `Arquivo selecionado: ${truncatedName}`;
    upload.style.borderColor = '#28a745';
    upload.style.backgroundColor = '#f8fff9';
}

// Inicializar algumas validações extras na carga da página
document.addEventListener('DOMContentLoaded', function() {
    // Definir data máxima para campos de data como hoje
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
   
    dateInputs.forEach(input => {
        input.setAttribute('max', today);
       
        // Para auditorias, definir data mínima como 5 anos atrás
        if (input.id === 'audit-date') {
            const fiveYearsAgo = new Date();
            fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
            input.setAttribute('min', fiveYearsAgo.toISOString().split('T')[0]);
        }
    });
   
    // Adicionar contador de caracteres para campos com limite
    addCharacterCounters();
});

function addCharacterCounters() {
    const fieldsWithCounters = [
       { id: 'report-title', max: 150 },
        { id: 'report-description', max: 1000 },
        { id: 'contract-title', max: 200 },
        { id: 'contract-description', max: 2000 },
        { id: 'audit-title', max: 200 },
        { id: 'document-title', max: 150 },
        { id: 'document-description', max: 800 },
        { id: 'financial-title', max: 200 },
        { id: 'financial-description', max: 1500 },
        { id: 'partnership-title', max: 250 },
        { id: 'partnership-description', max: 2000 }
    ];

    fieldsWithCounters.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element) return;

        const counter = document.createElement('div');
        counter.style.cssText = 'font-size: 12px; color: #666; text-align: right; margin-top: 5px;';
        counter.id = field.id + '-counter';
       
        element.parentNode.insertBefore(counter, element.nextSibling);
       
        function updateCounter() {
            const length = element.value.length;
            const remaining = field.max - length;
            counter.textContent = `${length}/${field.max} caracteres`;
           
            if (remaining < 20) {
                counter.style.color = '#dc3545';
            } else if (remaining < 50) {
                counter.style.color = '#ffc107';
            } else {
                counter.style.color = '#666';
            }
        }
       
        element.addEventListener('input', updateCounter);
        updateCounter(); // Inicializar contador
    });
}

