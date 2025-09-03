function toggleDropdown(genre) {
    const dropdown = document.getElementById(`${genre}-dropdown`);
    const isVisible = dropdown.style.display === 'block';
    
    // Переключаем текущий dropdown
    dropdown.style.display = isVisible ? 'none' : 'block';
    
    // Всегда пересчитываем высоту после изменений
    calculateSidebarHeight();
}

function calculateSidebarHeight() {
    const sidebar = document.getElementById('genre-sidebar');
    const genreItems = document.querySelectorAll('.genre-item');
    let totalHeight = 0;
    
    // Проходим по всем элементам и суммируем высоты
    genreItems.forEach(item => {
        const btn = item.querySelector('.genre-btn');
        const itemDropdown = item.querySelector('.dropdown-content');
        
        // Добавляем высоту кнопки
        totalHeight += btn.offsetHeight;
        
        // Если dropdown видим, добавляем его высоту
        if (itemDropdown.style.display === 'block') {
            totalHeight += itemDropdown.offsetHeight;
        }
        
        // Добавляем отступы между элементами
        totalHeight += 10;
    });
    
    // Добавляем дополнительные отступы
    totalHeight += 20;
    
    console.log('Total height calculated:', totalHeight); // Для отладки
    
    // Устанавливаем новую высоту, но не меньше минимальной
    const newHeight = Math.max(totalHeight, 520);
    sidebar.style.height = `${newHeight}px`;
    
    // Управляем скроллом
    if (newHeight > 520) {
        sidebar.style.overflowY = 'auto';
    } else {
        sidebar.style.overflowY = 'hidden';
    }
}

// Закрытие dropdown при клике вне области
document.addEventListener('click', function(event) {
    if (!event.target.closest('.genre-item') && !event.target.closest('.dropdown-content')) {
        closeAllDropdowns();
    }
});

// Функция для закрытия всех dropdown
function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.style.display = 'none';
    });
    calculateSidebarHeight();
}

// Обновляем высоту при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    calculateSidebarHeight();
});

// Также обновляем при изменении размера окна
window.addEventListener('resize', calculateSidebarHeight);


// Адаптивность для мобильных устройств 

let isMobileMenuOpen = false;

function toggleMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    const body = document.body;
    
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        navbar.classList.add('mobile-nav-active');
        mobileNavMenu.style.display = 'flex';
        body.style.overflow = 'hidden'; // Блокируем скролл страницы
    } else {
        navbar.classList.remove('mobile-nav-active');
        mobileNavMenu.style.display = 'none';
        body.style.overflow = ''; // Разблокируем скролл
    }
}

// Закрытие мобильного меню при клике вне его
document.addEventListener('click', function(event) {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    const navbar = document.querySelector('.navbar');
    
    if (isMobileMenuOpen && 
        !event.target.closest('.mobile-nav-menu') && 
        !event.target.closest('.mobile-menu-btn')) {
        
        navbar.classList.remove('mobile-nav-active');
        mobileNavMenu.style.display = 'none';
        isMobileMenuOpen = false;
        document.body.style.overflow = '';
    }
});

// Закрытие меню при изменении размера окна
window.addEventListener('resize', function() {
    if (window.innerWidth > 1024 && isMobileMenuOpen) {
        const navbar = document.querySelector('.navbar');
        const mobileNavMenu = document.getElementById('mobileNavMenu');
        
        navbar.classList.remove('mobile-nav-active');
        mobileNavMenu.style.display = 'none';
        isMobileMenuOpen = false;
        document.body.style.overflow = '';
    }
});
