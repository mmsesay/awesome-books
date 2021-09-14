const bookForm = document.forms['book-form'];
const bookContentContainer = document.getElementById('book-content-container');
const bookTitle = document.getElementById('title');
const bookDescription = document.getElementById('description');

function Book(title, description) {
  this.title = title;
  this.description = description;
}

const booksArray = JSON.parse(localStorage.getItem('Books') || '[]');
let newBookDiv = '';

const showAllBooks = () => {
  if (booksArray.length > 0) {
    booksArray.forEach((book) => {
      newBookDiv += `<p>${book.title}</p>
        <p>${book.description}</p>
        <button class='remove-book'>Remove</button>
        <hr>`;
    });
  }

  bookContentContainer.innerHTML = newBookDiv;
};

showAllBooks();

function addBookToList(newBook) {
  // append the new book
  newBookDiv += `<p>${newBook.title}</p>
    <p>${newBook.description}</p>
    <button class='remove-book'>Remove</button>
    <hr>`;
  bookContentContainer.innerHTML = newBookDiv;
  booksArray.push(newBook);// push the book to the array
  localStorage.setItem('Books', JSON.stringify(booksArray));// set the new book to the local storage
  window.location.reload();// relaod the window
}

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const book = new Book(bookTitle.value, bookDescription.value);
  addBookToList(book);
});

document.querySelectorAll('.remove-book').forEach((item, bookIndex) => {
  item.addEventListener('click', () => {
    const newBooksArray = booksArray.filter((book, index) => bookIndex !== index);
    localStorage.setItem('Books', JSON.stringify(newBooksArray));// set the new book to the local storage
    window.location.reload();// reload the page
  });
});
