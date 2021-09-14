function Book (title, description) {
    this.title = title;
    this.description = description;
  }


class BookStore {
  constructor() {
    this.newBookDiv = '';
    this.booksArray = JSON.parse(localStorage.getItem('Books') || '[]');
    this.bookForm = document.forms['book-form'];
    this.bookContentContainer = document.getElementById('book-content-container');
    this.bookTitle = document.getElementById('title');
    this.bookDescription = document.getElementById('description');
  }

  isFormSubmit = () => {
    this.bookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const book = {
        title: this.bookTitle.value,
        description: this.bookDescription.value
      };
      this.addBookToList(book);
    });
  }

  bookDetails = (book) => {
    this.newBookDiv += `<p>${book.title}</p>
      <p>${book.description}</p>
      <button class='remove-book'>Remove</button>
      <hr>`;
  }

  addBookToList = (newBook) => {
    // append the new book
    this.bookDetails(newBook);
    this.booksArray.push(newBook);// push the book to the array
    localStorage.setItem('Books', JSON.stringify(this.booksArray));// set the new book to the local storage
    window.location.reload();// relaod the window
  }

  removeBookFromList = () => {
    document.querySelectorAll('.remove-book').forEach((item, bookIndex) => {
      item.addEventListener('click', () => {
        const newBooksArray = this.booksArray.filter((book, index) => bookIndex !== index);
        localStorage.setItem('Books', JSON.stringify(newBooksArray));// set the new book to the local storage
        window.location.reload();// reload the page
      });
    });
  }

  showAllBooks = () => {
    if (this.booksArray.length > 0) {
      this.booksArray.forEach((book) => {
        this.bookDetails(book);
      });
    }

    this.bookContentContainer.innerHTML = this.newBookDiv;
  }
}

const bookStore = new BookStore();
bookStore.isFormSubmit();
bookStore.showAllBooks();
bookStore.removeBookFromList();
