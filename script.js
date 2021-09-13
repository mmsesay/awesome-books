const bookForm = document.forms['book-form'];
const bookTable = document.querySelector('#book-table');

function Book(title, description) {
    this.title = title;
    this.description = description;
}

function addBookToList(book) {
    const tr = document.createElement('tr');
    const title = document.createElement('td');
    const description = document.createElement('td');
    const deleteButton = document.createElement('button');
  
    td1.textContent = book.title;
    td2.textContent = book.description;
  
    deleteButton.textContent = 'Delete';
    
    tr.appendChild(title);
    tr.appendChild(description);
    tr.appendChild(deleteButton);
    bookTable.appendChild(tr);
}

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputIds = ['#title', '#description'];
    const inputs = [];
    inputIds.forEach(inputId => inputs.push(bookForm.querySelector(inputId)));
    const [title, description] = inputs;
    const book = new Book(title.value, description.value);
    addBookToList(book);
  });