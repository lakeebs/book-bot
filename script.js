const myLibrary = [];

// Constructor
function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.readStatus = function() {
  if (this.read === 'Read') {
    this.read = 'Unread';
  } else {
    this.read = 'Read';
  }
}

// Dialog box
const toggle = document.querySelector('.toggle');
const dialog = document.querySelector('dialog');
toggle.addEventListener('click', function(e) {
  if (dialog.open) {
    dialog.close();
    toggle.textContent = 'Add book';
  } else {
    dialog.show();
    toggle.textContent = 'Close';
  }
});

// Add sample books
addBook('Jane Austen', 'Pride and Prejudice', 416, 'Unread');
addBook('Stephen King', 'The Stand', 823, 'Read');
addBook('George Orwell', '1984', 328, 'Read');
addBook('Aldous Huxley', 'Brave New World', 288, 'Unread');
displayBooks();

// Add book to library
function addBook(author, title, pages, read) {
  const book = new Book(author, title, pages, read);
  myLibrary.push(book);
}

// Display books
function displayBooks() {
  const tableBody = document.querySelector('#books tbody');

  tableBody.innerHTML = '';

  myLibrary.slice().reverse().forEach((book, index) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td><button class="remove" onclick="removeBook(${myLibrary.length - 1 - index})">&times;</button></td>
      <td>${book.author}</td>
      <td>${book.title}</td>
      <td>${book.pages}</td>
      <td class="read-toggle"><span>${book.read}</span></td>
    `;

    const readToggle = row.querySelector('.read-toggle');
    readToggle.addEventListener('click', function() {
      book.readStatus();
      displayBooks();
    });
  });
}

// Remove book from library
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

// Event listener for add button
const addBtn = document.querySelector('.add');
const inputs = document.querySelectorAll('input');
const form = document.querySelector('form');
addBtn.addEventListener('click', function(e) {
  e.preventDefault();

  const author = document.querySelector('#author').value;
  const title = document.querySelector('#title').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked === false ? 'Unread' : 'Read';

  // Highlight invalid fields after submit
  inputs.forEach(input => {
    input.addEventListener('invalid', e => {
      input.classList.add('error');
    }, false);
  
    input.addEventListener('input', e => {
      if (input.checkValidity()) {
        input.classList.remove('error');
      }
    });
  });

  // If all fields are valid, proceed
  if (form.checkValidity()) {
    addBook(author, title, pages, read);
    displayBooks();
    form.reset();
  }
});

// Show/hide placeholder and label
inputs.forEach(input => {
  input.addEventListener('focus', e => {
    const placeholder = input.getAttribute('placeholder');
    const label = input.previousElementSibling;

    if (placeholder) {
      input.setAttribute('placeholder', '');
      label.classList.add('focused');
    }

  });
});

inputs.forEach(input => {
  input.addEventListener('blur', e => {
    const placeholder = input.getAttribute('placeholder');
    const label = input.previousElementSibling;
    const labelValue = input.previousElementSibling.textContent;

    if (placeholder == '') {
      input.setAttribute('placeholder', labelValue);
      label.classList.remove('focused');
    }

  });
});