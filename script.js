const books = document.querySelector('.library__books');
const addBtn = document.querySelector('.library__show-modal');
const popup = document.querySelector('.library__overlay');
const form = document.querySelector('.library__form');
const title = document.querySelector('.library__title');
const author = document.querySelector('.library__author');
const pages = document.querySelector('.library__pages');
const isRead = document.querySelector('.library__read');
const addBookBtn = document.querySelector('.library__btn-add');

let myLibrary = JSON.parse(localStorage.getItem('library')) || [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead ? true : false;
}

function openModal(trigger, modal, close) {
    trigger.addEventListener('click', () => {
        popup.classList.add('dark')
        modal.classList.add('open');
        lockBody();
    });

    close.addEventListener('click', (e) => {
        if ((title.value && author.value && pages.value)) {
            closeModal(popup, modal);
            unlockBody();
        }
    })
}

function closeModal(popup, modal) {
    popup.classList.remove('dark');
    modal.classList.remove('open');
    modal.reset();
}

function lockBody () {
    document.body.style.overflow = 'hidden';
}

function unlockBody () {
    document.body.style.overflow = '';
}

function setLocaleStorage() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function addBook(e) {
    if ((title.value && author.value && pages.value)) {
        const book = new Book(title.value, author.value, pages.value, isRead.checked);
        myLibrary.push(book);
        books.innerHTML = '';
        setLocaleStorage();
        renderBooks(myLibrary);
    }
}

function markAsRead (item, e) {
    item.isRead = !item.isRead;
    e.target.innerHTML = item.isRead ? 'Read' : 'Not read';
    setLocaleStorage();
}

function removeBook(i, e) {
    e.target.parentNode.remove();
    myLibrary.splice(i, 1);
    setLocaleStorage();
}

function renderBooks(items) {
    items.map((item, i) => {
        const book = document.createElement('div');
        book.innerHTML = `
            <div class="book__title">"${item.title}"</div>
            <div class="book__author">${item.author}</div>
            <div class="book__pages">${item.pages} pages</div>
            <button class="book__read">${item.isRead ? 'Read' : 'Not read'}</button>
            <button class="book__remove">Remove</button>
        `;
        books.append(book);
        book.classList.add('library__book');

        const read = document.querySelectorAll('.book__read');
        read.forEach(btn => btn.addEventListener('click', (e) => markAsRead(item, e)));
        
        const remove = document.querySelectorAll('.book__remove');
        remove.forEach((btn) => btn.addEventListener('click', (e) => removeBook(i, e)));
    })
}

window.addEventListener('DOMContentLoaded', () => {
    myLibrary = JSON.parse(localStorage.getItem('library'))
    renderBooks(myLibrary);
})

popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        closeModal(popup, form);
        unlockBody();
    }
})

addBookBtn.addEventListener('click', addBook);
openModal(addBtn, form, addBookBtn);


