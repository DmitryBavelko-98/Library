const books = document.querySelector('.library__books');
const addBtn = document.querySelector('.library__show-form');
const popup = document.querySelector('.library__form-wrapper');
const form = document.querySelector('.library__form');
const title = document.querySelector('.library__title');
const author = document.querySelector('.library__author');
const pages = document.querySelector('.library__pages');
const isRead = document.querySelector('.library__read');
const addBookBtn = document.querySelector('.library__btn-add');

const inputs = document.querySelectorAll('input');

let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead ? true : false;
}

Book.prototype.info = function () {
    console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}`);
} 

function renderBooks(items) {
    if ((title.value && author.value && pages.value)) {
        books.innerHTML = '';
        items.map((item, i, arr) => {
            const book = document.createElement('div');
            book.innerHTML = `
                <div class="book__title">${item.title}</div>
                <div class="book__author">${item.author}</div>
                <div class="book__pages">${item.pages}</div>
                <button class="book__read">${item.isRead ? 'Read' : 'Not read'}</button>
                <button class="book__remove">Remove</button>
            `;
            books.append(book);
            book.classList.add('library__book');
    
            const read = document.querySelectorAll('.book__read');
            read.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    item.isRead = !item.isRead;
                    e.target.innerHTML = item.isRead ? 'Read' : 'Not read';
                })
            })
            
            const remove = document.querySelectorAll('.book__remove');
            remove.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    arr.splice(i);
                    e.target.closest('div').remove();
                })
            });
        })
    }
}

function openModal(trigger, modal, close) {
    trigger.addEventListener('click', () => {
        popup.classList.add('dark')
        modal.classList.add('open')
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
        if ((title.value && author.value && pages.value)) {
            popup.classList.remove('dark');
            modal.classList.remove('open');
            modal.reset();
            document.body.style.overflow = '';
        }
    })
}

function addBook(e) {
    if ((title.value && author.value && pages.value)) {
        const book = new Book(title.value, author.value, pages.value, isRead.checked);
        myLibrary.push(book);
        renderBooks(myLibrary);
        document.body.classList.remove('dark');
    }
}

addBookBtn.addEventListener('click', addBook);
openModal(addBtn, form, addBookBtn);


