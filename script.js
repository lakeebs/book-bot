function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');

Book.prototype.info = function() {
  return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + this.read;
}

console.log(theHobbit.info());