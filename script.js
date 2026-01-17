// --- Testimonials Slider ---
const track = document.getElementById('sliderTrack');
const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dots = Array.from(document.querySelectorAll('.dot'));
// --- Mobile Menu Toggle ---
const menuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
    // Переключаем класс active для меню (показать/скрыть)
    navLinks.classList.toggle('active');
    // Переключаем класс is-active для кнопки (анимация в крестик)
    menuBtn.classList.toggle('is-active');
});

// Закрывать меню при клике на любую ссылку (удобно для одностраничных сайтов)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('is-active');
    });
});

let currentIndex = 0;

function updateSlider() {
    // Сдвигаем трек: ширина слайда (100%) + gap (40px, но в % это сложнее, 
    // поэтому используем простой translateX на 100% * индекс)
    // Вариант проще: считаем ширину слайда
    const slideWidth = slides[0].clientWidth; // получаем ширину одного слайда
    // Учитываем gap в CSS (40px). 
    // Проще всего двигать на (100% + gap) если использовать calc, но в JS:
    
    // Сброс позиции, так как у нас flex gap
    // Лучший способ для flex-gap слайдера:
    const amountToMove = slides[currentIndex].offsetLeft; 
    // offsetLeft вернет позицию слайда относительно родителя, учитывая gap
    
    track.style.transform = `translateX(-${amountToMove}px)`;

    // Обновляем точки
    dots.forEach(dot => dot.classList.remove('active'));
    if(dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
    }
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0; // Зацикливаем
    }
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1; // Зацикливаем в конец
    }
    updateSlider();
});

// Клик по точкам
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
    });
});

// Обновляем при изменении размера окна, чтобы не съехало
window.addEventListener('resize', updateSlider);

document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const btn = item.querySelector('.toggle-btn');

        header.addEventListener('click', () => {
            // Если хотим закрывать другие при открытии одной:
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                    // Возвращаем плюс у закрытых
                    otherItem.querySelector('.toggle-btn').textContent = '+';
                }
            });

            // Переключаем класс open
            item.classList.toggle('open');
            
            // Логика смены значка
            if (item.classList.contains('open')) {
                // Если открыли - ставим минус
                btn.textContent = '-';
            } else {
                // Если закрыли - ставим плюс
                btn.textContent = '+';
            }
        });
    });
});