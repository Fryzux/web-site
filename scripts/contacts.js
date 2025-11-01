// Получение элементов
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Валидация email
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Валидация поля
const validateField = (field) => {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';

    // Удаление предыдущих состояний ошибки
    field.removeAttribute('aria-invalid'); // ✅ ИСПРАВЛЕНИЕ 1

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

    // Установка ARIA-атрибутов и отображение ошибки
    if (!isValid) {
        formGroup.classList.add('has-error');
        field.setAttribute('aria-invalid', 'true'); // ✅ ИСПРАВЛЕНИЕ 2
        errorMessage.textContent = message;
    } else {
        formGroup.classList.remove('has-error');
        field.setAttribute('aria-invalid', 'false'); // ✅ ИСПРАВЛЕНИЕ 3
        errorMessage.textContent = '';
    }

    return isValid;
};

// Валидация в реальном времени
const formFields = form.querySelectorAll('input, textarea');
formFields.forEach(field => {
    // Валидация при потере фокуса
    field.addEventListener('blur', () => {
        if (field.value.trim() !== '' || field.hasAttribute('required')) {
            validateField(field);
        }
    });

    // Валидация при вводе (если поле содержит ошибку)
    field.addEventListener('input', () => {
        if (field.closest('.form-group').classList.contains('has-error')) {
            validateField(field);
        }
    });
});

// Отправка формы
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Валидация всех полей
    let isFormValid = true;
    let firstInvalidField = null; // ✅ ИСПРАВЛЕНИЕ 4

    formFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
            if (!firstInvalidField) {
                firstInvalidField = field; // ✅ ИСПРАВЛЕНИЕ 5
            }
        }
    });

    if (isFormValid) {
        // Имитация отправки формы
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log('Отправка данных:', data);

        // Показ сообщения об успехе
        successMessage.style.display = 'block';
        successMessage.setAttribute('tabindex', '-1');
        successMessage.focus(); // ✅ ИСПРАВЛЕНИЕ 6

        // Сброс формы
        form.reset();
        
        // Очистка всех ARIA-атрибутов
        formFields.forEach(field => {
            const formGroup = field.closest('.form-group');
            formGroup.classList.remove('has-error');
            field.removeAttribute('aria-invalid'); // ✅ ИСПРАВЛЕНИЕ 7
            const errorMsg = formGroup.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.textContent = '';
            }
        });

        // Скрытие сообщения через 5 секунд
        setTimeout(() => {
            successMessage.style.display = 'none';
            successMessage.removeAttribute('tabindex');
        }, 5000);
    } else {
        // ✅ ИСПРАВЛЕНИЕ 8: Фокус на первое невалидное поле
        if (firstInvalidField) {
            firstInvalidField.focus();
        }
    }
});

// Обработка кнопки очистки формы
form.addEventListener('reset', () => {
    setTimeout(() => {
        formFields.forEach(field => {
            const formGroup = field.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            
            formGroup.classList.remove('has-error');
            field.removeAttribute('aria-invalid'); // ✅ ИСПРАВЛЕНИЕ 9
            
            if (errorMessage) {
                errorMessage.textContent = '';
            }
        });
    }, 10);
});
