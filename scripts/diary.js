// Анимация прогресс-баров при прокрутке
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

// Наблюдение за курсами
const courseCards = document.querySelectorAll('.course-card');
courseCards.forEach(card => observer.observe(card));

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
