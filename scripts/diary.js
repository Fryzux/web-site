// Анимация прогресс-баров при прокрутке
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.course-progress-fill');
            progressBars.forEach(bar => {
                const currentWidth = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = currentWidth;
                }, 100);
            });
        }
    });
}, observerOptions);

// Наблюдение за курсами
const courseItems = document.querySelectorAll('.course-item');
courseItems.forEach(item => observer.observe(item));

// Анимация счетчиков статистики
const statNumbers = document.querySelectorAll('.stat-number');

const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const finalValue = parseInt(entry.target.textContent);
            animateValue(entry.target, 0, finalValue, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// Фильтрация записей по тегам (опционально)
const entryTags = document.querySelectorAll('.entry-tags span');
entryTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const tagText = tag.textContent;
        console.log(`Фильтр по тегу: ${tagText}`);
        // Здесь можно добавить логику фильтрации
    });
    tag.style.cursor = 'pointer';
});

// Анимация для временной шкалы
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, 100);
        }
    });
}, { threshold: 0.3 });

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => timelineObserver.observe(item));

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Diary page loaded successfully');
    
    // Проверяем, есть ли элементы для анимации
    const courseProgressBars = document.querySelectorAll('.course-progress-fill');
    console.log(`Found ${courseProgressBars.length} progress bars`);
    
    // Добавляем анимацию для уже видимых элементов
    timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
});

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Ошибка на странице дневника:', e.error);
});

// Улучшенная анимация для прогресс-баров с проверкой доступности
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Отключаем анимации для пользователей с предпочтением reduced motion
    const style = document.createElement('style');
    style.textContent = `
        .course-progress-fill {
            transition: none !important;
        }
        .timeline-item {
            transition: none !important;
        }
    `;
    document.head.appendChild(style);
}