let currentPage = 1;
const booksPerPage = 12;
let totalBooks = 120; // Это будет динамически обновляться

function changePage(page) {
    if (page < 1 || page > Math.ceil(totalBooks / booksPerPage)) return;
    
    currentPage = page;
    updatePagination();
    loadBooksForPage(page);
}

function updatePagination() {
    const totalPages = Math.ceil(totalBooks / booksPerPage);
    
    // Обновляем активную страницу
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.textContent) === currentPage) {
            btn.classList.add('active');
        }
    });
    
    // Обновляем кнопки навигации
    document.querySelector('.prev-btn').disabled = currentPage === 1;
    document.querySelector('.next-btn').disabled = currentPage === totalPages;
    
    // Обновляем информацию о странице
    const startBook = (currentPage - 1) * booksPerPage + 1;
    const endBook = Math.min(currentPage * booksPerPage, totalBooks);
    document.querySelector('.pagination-info').textContent = 
        `Показано ${startBook}-${endBook} из ${totalBooks} книг`;
}

function loadBooksForPage(page) {
    // Здесь будет логика загрузки книг для конкретной страницы
    // Например, AJAX запрос к серверу или фильтрация локальных данных
    console.log(`Загрузка книг для страницы ${page}`);
    
    // Временная заглушка - просто прокрутка к верху
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function generatePagination() {
    const totalPages = Math.ceil(totalBooks / booksPerPage);
    const paginationElement = document.querySelector('.page-numbers');
    
    let paginationHTML = '';
    
    // Всегда показываем первую страницу
    paginationHTML += `<button class="page-btn ${currentPage === 1 ? 'active' : ''}" onclick="changePage(1)">1</button>`;
    
    // Логика отображения страниц с точками
    if (totalPages > 7) {
        // Сложная логика для большого количества страниц
        if (currentPage <= 4) {
            for (let i = 2; i <= 5; i++) {
                paginationHTML += `<button class="page-btn ${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
            }
            paginationHTML += `<span class="page-dots">...</span>`;
            paginationHTML += `<button class="page-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
        } else if (currentPage >= totalPages - 3) {
            paginationHTML += `<span class="page-dots">...</span>`;
            for (let i = totalPages - 4; i <= totalPages; i++) {
                paginationHTML += `<button class="page-btn ${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
            }
        } else {
            paginationHTML += `<span class="page-dots">...</span>`;
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                paginationHTML += `<button class="page-btn ${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
            }
            paginationHTML += `<span class="page-dots">...</span>`;
            paginationHTML += `<button class="page-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
        }
    } else {
        // Простой случай - меньше 7 страниц
        for (let i = 2; i <= totalPages; i++) {
            paginationHTML += `<button class="page-btn ${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        }
    }
    
    paginationElement.innerHTML = paginationHTML;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    generatePagination();
    updatePagination();
});