// js/validation.js

const errorMessages = {
    valueMissing: 'Este campo é obrigatório.',
    typeMismatch: 'Por favor, preencha um e-mail válido.',
    tooShort: 'O nome deve ter pelo menos 3 caracteres.',
    patternMismatch: 'O formato inserido não é válido. Ex: 123.456.789-00'
};
const errorTypes = ['valueMissing', 'typeMismatch', 'tooShort', 'patternMismatch'];

function showErrorMessage(field, message) {
    const errorElement = field.nextElementSibling;
    field.classList.add('is-invalid');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideErrorMessage(field) {
    const errorElement = field.nextElementSibling;
    field.classList.remove('is-invalid');
    errorElement.style.display = 'none';
}

function validateField(field) {
    let message = '';
    field.setCustomValidity(''); // Limpa validações customizadas anteriores

    errorTypes.forEach(error => {
        if (field.validity[error]) {
            message = errorMessages[error] || 'Campo inválido.';
        }
    });

    if (message) {
        showErrorMessage(field, message);
        return false;
    }
    
    hideErrorMessage(field);
    return true;
}

function showToast(message, duration = 3000) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
}

function showFeedback() {
    const formAlert = document.getElementById('form-alert');
    formAlert.classList.remove('hidden');
    document.getElementById('alert-close-btn').addEventListener('click', () => {
        formAlert.classList.add('hidden');
    });
    showToast('Cadastro enviado com sucesso!');
}

export function initFormValidation() {
    const form = document.getElementById('form-voluntario');
    if (!form) return;

    const fields = form.querySelectorAll('[required]');

    fields.forEach(field => {
        field.addEventListener('blur', (event) => validateField(event.target));
        field.addEventListener('invalid', event => event.preventDefault());
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        let isFormValid = true;
        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            showFeedback();
            form.reset();
            fields.forEach(hideErrorMessage);
        }
    });
}