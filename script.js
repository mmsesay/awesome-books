const bookForm = document.forms['book-form'];
const bookTable = document.querySelector('#book-table');

function Book(title, description) {
    this.title = title;
    this.description = description;
}

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputIds = ['#title', '#description'];
    const inputs = [];
    inputIds.forEach(inputId => inputs.push(bookForm.querySelector(inputId)));
    const [title, description] = inputs;
    const book = new Book(title.value, description.value);
  });