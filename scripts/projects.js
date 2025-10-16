// Данные проектов с реальными ссылками
const projectsData = {
    1: {
        icon: '🌐',
        title: 'Личный сайт',
        description: 'Полностью адаптивный личный сайт с использованием HTML5 и CSS3. Включает анимации и современный дизайн.',
        tech: 'HTML5, CSS3, JavaScript',
        date: 'Октябрь 2025',
        demoLink: 'https://html5up.net/',
        codeLink: 'https://github.com/StartBootstrap/startbootstrap-clean-blog'
    },
    3: {
        icon: '🛒',
        title: 'Интернет-магазин',
        description: 'SPA интернет-магазин с корзиной, фильтрацией товаров и интеграцией с API.',
        tech: 'React, Redux, API',
        date: 'Август 2025',
        demoLink: 'https://react-shopping-cart-67954.firebaseapp.com/',
        codeLink: 'https://github.com/jeffersonRibeiro/react-shopping-cart'
    },
    4: {
        icon: '📱',
        title: 'Портфолио',
        description: 'Адаптивное портфолио с использованием Bootstrap и современных компонентов.',
        tech: 'Bootstrap, jQuery',
        date: 'Июль 2025',
        demoLink: 'https://startbootstrap.com/theme/resume',
        codeLink: 'https://github.com/StartBootstrap/startbootstrap-resume'
    },
    5: {
        icon: '🎮',
        title: 'Игра',
        description: 'Простая браузерная игра с использованием Canvas API и игровой механики.',
        tech: 'JavaScript, Canvas',
        date: 'Июнь 2025',
        demoLink: 'https://codeincomplete.com/games/racer/',
        codeLink: 'https://github.com/jakesgordon/javascript-racer'
    },
    6: {
        icon: '📊',
        title: 'Дашборд',
        description: 'Интерактивная панель управления с графиками и визуализацией данных.',
        tech: 'React, Chart.js',
        date: 'Май 2025',
        demoLink: 'https://react-admin-dashboard-demo.netlify.app/',
        codeLink: 'https://github.com/dunky11/react-saas-template'
    }
};

// Фильтрация проектов
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card-detail');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Обновление активной кнопки
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Фильтрация карточек
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                // Анимация появления
                card.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Модальное окно
const modal = document.getElementById('projectModal');
const detailButtons = document.querySelectorAll('.btn-detail');
const closeBtn = document.querySelector('.close');
const modalContent = document.querySelector('.modal-content');

// Функция для открытия модального окна
function openModal(projectId) {
    const project = projectsData[projectId];
    
    if (!project) {
        console.error('Проект не найден:', projectId);
        return;
    }
    
    // Заполнение модального окна
    document.getElementById('modalIcon').textContent = project.icon;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalTech').textContent = project.tech;
    document.getElementById('modalDate').textContent = project.date;
    
    // Обновление ссылок
    const demoLink = document.querySelector('#demoLink');
    const codeLink = document.querySelector('#codeLink');
    
    demoLink.href = project.demoLink;
    demoLink.target = '_blank';
    demoLink.textContent = '🎯 Демо';
    
    codeLink.href = project.codeLink;
    codeLink.target = '_blank';
    codeLink.textContent = '💻 Посмотреть код';
    
    // Сохраняем ID текущего проекта в модальном окне
    modalContent.setAttribute('data-current-project', projectId);
    
    // Показываем модальное окно
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Функция для закрытия модального окна
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Обработчики для кнопок "Подробнее"
detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectCard = button.closest('.project-card-detail');
        const projectId = projectCard.getAttribute('data-project');
        openModal(projectId);
    });
});

// Обработчики для закрытия модального окна
closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Закрытие по ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Обработка кликов по кнопкам в модальном окне
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-modal')) {
        e.preventDefault();
        const link = e.target.href;
        
        if (link && link !== '#' && !link.includes('javascript:')) {
            // Открываем ссылку в новой вкладке
            window.open(link, '_blank');
            
            // Логируем переход
            console.log('Переход по ссылке:', link);
            
            // Показываем уведомление
            showNotification(`Открывается ${e.target.textContent.includes('Демо') ? 'демо' : 'исходный код'} проекта`, 'success');
        } else {
            // Если ссылка не указана, показываем сообщение
            showNotification('Ссылка временно недоступна', 'info');
        }
    }
});

// Функция для показа уведомлений
function showNotification(message, type = 'info') {
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4F7942' : type === 'error' ? '#ff6b6b' : '#D9B56D'};
        color: ${type === 'error' ? 'white' : '#0F291C'};
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease;
        border: 2px solid ${type === 'success' ? '#77A35C' : type === 'error' ? '#ff5252' : '#DAA520'};
        font-weight: bold;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Добавляем CSS анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .project-card-detail {
        animation: fadeIn 0.5s ease-in;
    }
    
    .btn-modal {
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 8px;
    }
    
    .btn-modal:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(79, 121, 66, 0.4);
    }
    
    .btn-detail {
        transition: all 0.3s ease;
    }
    
    .btn-detail:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(79, 121, 66, 0.4);
    }
`;
document.head.appendChild(style);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Projects page loaded successfully');
    
    // Добавляем анимацию для карточек при загрузке
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Проверяем, есть ли активные проекты
    const activeProjects = Object.keys(projectsData).length;
    console.log(`Загружено проектов: ${activeProjects}`);
});

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Ошибка на странице проектов:', e.error);
});

// Дополнительные проекты для разных категорий (можно добавить позже)
const additionalProjects = {
    7: {
        icon: '📝',
        title: 'Блог платформа',
        description: 'Современная платформа для ведения блога с системой комментариев.',
        tech: 'Vue.js, Node.js, MongoDB',
        date: 'Апрель 2025',
        demoLink: 'https://vue-blog-demo.netlify.app/',
        codeLink: 'https://github.com/vuejs/vue-hackernews-2.0'
    },
    8: {
        icon: '🎵',
        title: 'Музыкальный плеер',
        description: 'Веб-приложение для прослушивания музыки с плейлистами.',
        tech: 'JavaScript, Web Audio API',
        date: 'Март 2025',
        demoLink: 'https://music-player-demo123.netlify.app/',
        codeLink: 'https://github.com/WebDevSimplified/YouTube-Music-Clone'
    }
};