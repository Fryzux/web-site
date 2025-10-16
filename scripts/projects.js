// Данные проектов
const projectsData = {
    1: {
        title: "Интернет-магазин",
        description: "Полнофункциональный интернет-магазин с корзиной, фильтрацией товаров и адаптивным дизайном. Реализована работа с localStorage для сохранения корзины.",
        tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
        date: "Сентябрь 2025",
        role: "Frontend разработчик",
        github: "https://github.com/username/shop",
        live: "https://shop-demo.com",
        image: "../images/project1.jpg"
    },
    2: {
        title: "Анализ данных",
        description: "Проект по визуализации статистических данных с использованием Python. Включает обработку данных, статистический анализ и создание интерактивных графиков.",
        tech: ["Python", "NumPy", "Pandas", "Matplotlib"],
        date: "Октябрь 2025",
        role: "Data Analyst",
        github: "https://github.com/username/data-analysis",
        live: "#",
        image: "../images/project2.jpg"
    },
    3: {
        title: "Погодное приложение",
        description: "Веб-приложение для отображения прогноза погоды с использованием OpenWeatherMap API. Геолокация пользователя и детальный прогноз на неделю.",
        tech: ["JavaScript", "Weather API", "CSS Grid", "Geolocation"],
        date: "Август 2025",
        role: "Frontend разработчик",
        github: "https://github.com/username/weather-app",
        live: "https://weather-demo.com",
        image: "../images/project3.jpg"
    },
    4: {
        title: "UI Kit библиотека",
        description: "Набор переиспользуемых компонентов интерфейса с документацией. Включает кнопки, формы, карточки и другие элементы с различными вариациями.",
        tech: ["Figma", "CSS", "Design System", "Storybook"],
        date: "Июль 2025",
        role: "UI/UX Designer",
        github: "https://github.com/username/ui-kit",
        live: "https://uikit-demo.com",
        image: "../images/project4.jpg"
    },
    5: {
        title: "Телеграм-бот",
        description: "Бот для автоматизации рутинных задач: напоминания, заметки, расписание. Использует SQLite для хранения данных пользователей.",
        tech: ["Python", "Telegram Bot API", "SQLite", "asyncio"],
        date: "Июнь 2025",
        role: "Backend разработчик",
        github: "https://github.com/username/telegram-bot",
        live: "https://t.me/mybot",
        image: "../images/project5.jpg"
    },
    6: {
        title: "Мобильная игра",
        description: "Простая аркадная игра с использованием Canvas API. Включает систему очков, уровни сложности и сохранение рекордов.",
        tech: ["Canvas API", "JavaScript", "Game Development", "Web Audio API"],
        date: "Май 2025",
        role: "Game Developer",
        github: "https://github.com/username/game",
        live: "https://game-demo.com",
        image: "../images/project6.jpg"
    }
};

// Фильтрация проектов
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

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
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Модальное окно
const modal = document.getElementById('projectModal');
const detailButtons = document.querySelectorAll('.details-btn');
const closeBtn = document.querySelector('.close');

detailButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const project = projectsData[projectId];
        
        // Заполнение модального окна
        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        document.getElementById('modalTech').innerHTML = project.tech.map(tech => 
            `<span style="display: inline-block; padding: 0.25rem 0.75rem; background: #f3f4f6; border-radius: 15px; margin: 0.25rem; font-size: 0.85rem;">${tech}</span>`
        ).join('');
        document.getElementById('modalDate').textContent = project.date;
        document.getElementById('modalRole').textContent = project.role;
        document.getElementById('githubLink').href = project.github;
        document.getElementById('liveLink').href = project.live;
        
        modal.style.display = 'block';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
