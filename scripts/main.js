// Анимация прогресс-баров при скролле
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                // Обновляем ARIA атрибуты
                const progressBar = bar.closest('.skill-bar');
                if (progressBar) {
                    progressBar.setAttribute('aria-valuenow', progress);
                }
                
                // Плавная анимация с задержкой
                setTimeout(() => {
                    bar.style.transition = 'width 2s ease-in-out';
                    bar.style.width = progress + '%';
                }, 200);
            });
            progressObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Наблюдаем за секцией навыков
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    progressObserver.observe(skillsSection);
}

// Установка активной ссылки в навигации
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
    } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    }
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Оптимизация для пользователей с предпочтением reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully');
    
    // Добавляем анимацию для карточек проектов
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Инициализация прогресс-баров с начальным состоянием
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
        bar.style.width = '0%';
        bar.style.transition = 'width 2s ease-in-out';
    });
});

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Error on portfolio page:', e.error);
});