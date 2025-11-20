document.addEventListener('DOMContentLoaded', function() {
    // Проверяем ширину экрана
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Функция инициализации слайдера
    function initSlider(sliderName) {
        const container = document.querySelector(`[data-slider="${sliderName}"]`);
        const prevBtn = document.querySelector(`.${sliderName}-but-prev`);
        const nextBtn = document.querySelector(`.${sliderName}-but-next`);

        if (!container || !prevBtn || !nextBtn) {
            console.log(`Slider ${sliderName}: не найден контейнер или кнопки`);
            return;
        }

        const items = Array.from(container.children);
        let currentIndex = 0;

        console.log(`Slider ${sliderName} initialized with ${items.length} items`);

        // Функция для прокрутки к элементу
        function scrollToIndex(index) {
            if (index < 0 || index >= items.length) return;

            currentIndex = index;
            const item = items[currentIndex];

            // Прокрутка с центрированием элемента
            const containerRect = container.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();
            const scrollLeft = item.offsetLeft - (containerRect.width / 2) + (itemRect.width / 2);

            container.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }

        // Обработчики кнопок
        prevBtn.addEventListener('click', function() {
            scrollToIndex(currentIndex - 1);
        });

        nextBtn.addEventListener('click', function() {
            scrollToIndex(currentIndex + 1);
        });

        // Отслеживание скролла для обновления currentIndex
        let scrollTimeout;
        container.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                const containerRect = container.getBoundingClientRect();
                const containerCenter = containerRect.left + containerRect.width / 2;

                // Находим элемент, ближайший к центру
                let closestIndex = 0;
                let minDistance = Infinity;

                items.forEach(function(item, index) {
                    const itemRect = item.getBoundingClientRect();
                    const itemCenter = itemRect.left + itemRect.width / 2;
                    const distance = Math.abs(containerCenter - itemCenter);

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = index;
                    }
                });

                currentIndex = closestIndex;
            }, 100);
        });

        // Инициализация - показываем первый слайд
        scrollToIndex(0);
    }

    // Функция для показа/скрытия кнопок в зависимости от размера экрана
    function toggleSliderButtons() {
        const buttonContainers = document.querySelectorAll('.slider-but-container');

        buttonContainers.forEach(function(container) {
            if (isMobile()) {
                container.style.display = 'flex';
            } else {
                container.style.display = 'none';
            }
        });
    }

    // Инициализация всех слайдеров только на мобильных
    function initAllSliders() {
        if (isMobile()) {
            initSlider('steps');
            initSlider('structure');
            initSlider('analysis');
            initSlider('commands');
        }
        toggleSliderButtons();
    }

    // Инициализация при загрузке
    initAllSliders();

    // Переинициализация при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            initAllSliders();
        }, 250);
    });
});
