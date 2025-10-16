const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Валидация email
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Валидация поля
const validateField = (field) => {
    const formGroup = field.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';

    // Проверка обязательных полей
    if (field.hasAttribute('required') && field.value.trim() === '') {
        isValid = false;
        message = 'Это поле обязательно для заполнения';
    }

    // Проверка email
    if (field.type === 'email' && field.value !== '' && !validateEmail(field.value)) {
        isValid = false;
        message = 'Введите корректный email адрес';
    }

    // Проверка минимальной длины сообщения
    if (field.name === 'message' && field.value.trim().length > 0 && field.value.trim().length < 10) {
        isValid = false;
        message = 'Сообщение должно содержать минимум 10 символов';
    }

    // Отображение ошибки
    if (!isValid) {
        formGroup.classList.add('error');
        errorMessage.textContent = message;
    } else {
        formGroup.classList.remove('error');
        errorMessage.textContent = '';
    }

    return isValid;
};

// Валидация в реальном времени
const formFields = form.querySelectorAll('input, textarea');
formFields.forEach(field => {
    field.addEventListener('blur', () => {
        validateField(field);
    });

    field.addEventListener('input', () => {
        if (field.parentElement.classList.contains('error')) {
            validateField(field);
        }
    });
});

// Отправка формы
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Валидация всех полей
    let isFormValid = true;
    formFields.forEach(field => {
        if (field.hasAttribute('required') || field.value !== '') {
            if (!validateField(field)) {
                isFormValid = false;
            }
        }
    });

    if (isFormValid) {
        // Имитация отправки формы
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log('Отправка данных:', data);

        // Показ сообщения об успехе
        form.style.display = 'none';
        formSuccess.style.display = 'block';

        // Сброс формы через 3 секунды
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            formSuccess.style.display = 'none';
        }, 3000);
    } else {
        // Прокрутка к первой ошибке
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});
