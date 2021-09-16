class BookStore {
  constructor() {
    this.newBookDiv = '';
    this.booksArray = JSON.parse(localStorage.getItem('Books') || '[]');
    this.bookForm = document.forms['book-form'];
    this.bookContentContainer = document.getElementById('book-content-container');
    this.bookTitle = document.getElementById('title');
    this.bookDescription = document.getElementById('description');
    this.bookContainer = document.getElementById('books-container');
    this.formContainer = document.querySelector('.form-container');
    this.contactContainer = document.querySelector('.contact');
    this.liList = document.getElementById('li-list');
    this.liAdd = document.getElementById('li-add');
    this.liContact = document.getElementById('li-contact');
  }

  isFormSubmit = () => {
    this.bookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const book = {
        title: this.bookTitle.value,
        description: this.bookDescription.value,
      };

      this.addBookToList(book);
    });
  }

  bookDetails = (book) => {
    this.newBookDiv += `<tr class='flex items-center justify-between h-10 md:h-14 px-2 my-3 md:my-4 md:px-10 font-glory'>
      <td class='text-gray-600 font-bold font-roboto md:text-lg'>'${book.title}' by ${book.description}</td>
      <td class='text-gray-600 font-bold'>
      <button class='remove-book bg-blue-500 text-white p-1 md:text-lg md:w-24 rounded shadow-lg border hover:shadow-none hover:bg-transparent hover:border-blue-500 hover:text-gray-700'>Remove</button>
      </td>
      </tr>`;
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

  sendCurrentDateTime = () => {
    /* eslint-disable */
    window.addEventListener('load', () => {
      const { DateTime } = luxon;
      this.today = DateTime.now();
      document.getElementById('date-time-span').textContent = this.today.toLocaleString(DateTime.DATETIME_MED);      
    });
    /* eslint-enable */
  }

  hideElements = (args) => {
    args.forEach((element) => {
      element.style.display = 'none';
    });
  }

  showElements = (args) => {
    args.forEach((element) => {
      element.style.display = 'block';
    });
  }

  addActiveClass = (args) => {
    args.forEach((element) => {
      element.classList.add('active');
    });
  }

  removeActiveClass = (args) => {
    args.forEach((element) => {
      element.classList.remove('active');
    });
  }

  handleContentChange = () => {
    this.liList.addEventListener('click', () => {
      this.showElements([this.bookContainer]);
      this.hideElements([this.formContainer, this.contactContainer]);
      this.addActiveClass([this.liList]);
      this.removeActiveClass([this.liAdd, this.liContact]);
    });

    this.liAdd.addEventListener('click', () => {
      this.showElements([this.formContainer]);
      this.hideElements([this.bookContainer, this.contactContainer]);
      this.addActiveClass([this.liAdd]);
      this.removeActiveClass([this.liList, this.liContact]);
    });

    this.liContact.addEventListener('click', () => {
      this.showElements([this.contactContainer]);
      this.hideElements([this.formContainer, this.bookContainer]);
      this.addActiveClass([this.liContact]);
      this.removeActiveClass([this.liList, this.liAdd]);
    });
  }
}

const bookStore = new BookStore();
bookStore.isFormSubmit();
bookStore.showAllBooks();
bookStore.removeBookFromList();
bookStore.sendCurrentDateTime();
bookStore.handleContentChange();
