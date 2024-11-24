const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".add");
const closeButton = document.querySelector(".close-modal");
const createButton = document.querySelector(".create");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");
const bookRead = document.querySelector("#bookRead");
const form = document.querySelector("form.form");

class Book {
  constructor(title, author, pages, read) {
    this._title = title;
    this._author = author;
    this._pages = pages;
    this._read = read;
  }

  get title() {
    return this._title;
  }

  get author() {
    return this._author;
  }

  get pages() {
    return this._pages;
  }

  get read() {
    return this._read;
  }

  set read(status) {
    this._read = status;
  }
}

class Library {
  constructor() {
    this._books = [];
  }

  get getBooks() {
    return this._books;
  }

  addBookToLibrary(book) {
    this._books.push(book);
  }

  getBookByIndex(index) {
    return this._books[index];
  }

  deleteBook(bookIndex) {
    this._books.splice(bookIndex, 1);
  }
}
showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

createButton.addEventListener("click", (event) => {
  event.preventDefault();

  const valid =
    bookTitle.validity.valid &&
    bookAuthor.validity.valid &&
    bookPages.validity.valid;
  if (valid) {
    let createdBook = new Book(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      bookRead.checked
    );
    myLibrary.addBookToLibrary(createdBook);
    form.reset();
    dialog.close();
    displayBooks();
  } else {
    showBookPagesError();
    showBookAuthorError();
    showBookTitleError();
  }
});

bookTitle.addEventListener("input", (event) => {
  console.log(bookTitle.validity.valueMissing);
  if (bookTitle.validity.valueMissing) {
    bookTitle.setCustomValidity("Please fill in this field");
    bookTitle.reportValidity();
  } else {
    bookTitle.setCustomValidity("");
    bookTitle.className = "";
  }
});

bookAuthor.addEventListener("input", (event) => {
  if (bookAuthor.validity.valueMissing) {
    bookAuthor.setCustomValidity("Please fill in this field");
    bookAuthor.reportValidity();
  } else {
    bookAuthor.setCustomValidity("");
    bookAuthor.className = "";
  }
});

bookPages.addEventListener("input", (event) => {
  if (bookPages.validity.valueMissing) {
    bookPages.setCustomValidity("Please fill in this field");
  } else if (bookPages.validity.patterMismatch) {
    bookPages.setCustomValidity("Please enter numeric value");
  } else {
    bookPages.setCustomValidity("");
    bookPages.className = "";
  }
  bookPages.reportValidity();
});

let myLibrary = new Library();

function submitForm(event) {}

let book1 = new Book("HP", "Rowling", 520, false);

let book2 = new Book("Klub Zahad", "neznam", 123, true);

let book3 = new Book("Hobbit", "Tolkien", 1250, false);

myLibrary.addBookToLibrary(book1);
myLibrary.addBookToLibrary(book2);
myLibrary.addBookToLibrary(book3);

function deleteBook(bookIndex) {
  myLibrary.deleteBook(bookIndex);
  displayBooks();
}

function createDeleteButton(bookIndex) {
  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete Book";
  deleteButton.setAttribute("index", bookIndex);
  deleteButton.setAttribute("class", "delete");

  return deleteButton;
}

function createReadCheckbox(bookIndex) {
  let readCheckbox = document.createElement("input");
  readCheckbox.setAttribute("type", "checkbox");
  readCheckbox.setAttribute("class", "read-checkbox");
  readCheckbox.setAttribute("index", bookIndex);
  readCheckbox.setAttribute("id", "read-checkbox");

  return readCheckbox;
}

function changeReadStatus(bookIndex) {
  myLibrary.getBookByIndex(bookIndex).read =
    !myLibrary.getBookByIndex(bookIndex).read;
  displayBooks();
}

function displayBooks() {
  let tableBody = document.querySelector(".tableBody");
  let newTbody = document.createElement("tbody");
  newTbody.setAttribute("class", "tableBody");
  let bookIndex = 0;
  for (let book of myLibrary.getBooks) {
    console.log(book);
    let newRow = newTbody.insertRow(-1);

    let titleCell = newRow.insertCell(0);
    let newTitle = document.createTextNode(book.title);
    titleCell.appendChild(newTitle);

    let authorCell = newRow.insertCell(1);
    let newAuthor = document.createTextNode(book.author);
    authorCell.appendChild(newAuthor);

    let pagesCell = newRow.insertCell(2);
    let newPages = document.createTextNode(book.pages);
    pagesCell.appendChild(newPages);

    let readCell = newRow.insertCell(3);
    readCell.setAttribute("class", "checkbox-cell");
    let newReadCheckbox = createReadCheckbox(bookIndex);
    newReadCheckbox.checked = book.read;
    readCell.appendChild(newReadCheckbox);

    let readLabel = document.createElement("label");
    readLabel.setAttribute("for", "read-checkbox");
    readLabel.setAttribute("class", "read-check-label");
    readCell.appendChild(readLabel);

    let onSpan = document.createElement("span");
    onSpan.setAttribute("class", "on");
    onSpan.innerText = "Read";
    let offSpan = document.createElement("span");
    offSpan.setAttribute("class", "off");
    offSpan.innerText = "Unread";

    readLabel.appendChild(onSpan);
    readLabel.appendChild(offSpan);

    let deleteCell = newRow.insertCell(4);
    deleteCell.appendChild(createDeleteButton(bookIndex));
    bookIndex++;
  }
  tableBody.parentNode.replaceChild(newTbody, tableBody);

  const deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      deleteBook(e.target.getAttribute("index"));
    });
  });

  const readCheckboxes = document.querySelectorAll(".read-checkbox");

  readCheckboxes.forEach((box) => {
    box.addEventListener("change", (e) => {
      changeReadStatus(e.target.getAttribute("index"));
    });
  });
}

// function showError() {
//   const inputs = [bookTitle, bookAuthor, bookPages];

//   inputs.forEach((inputElement) => {
//     if (inputElement.validity.valueMissing) {
//       inputElement.className = "invalid";
//       console.log("setting custom validity");
//       inputElement.setCustomValidity("Please fill in this field");
//     } else if (inputElement.validity.patterMismatch) {
//       inputElement.className = "invalid";
//       inputElement.setCustomValidity("Please enter numeric value");
//     } else {
//       inputElement.setCustomValidity("");
//     }
//   });
// }

function showBookTitleError() {
  console.log("title");
  if (bookTitle.validity.valueMissing) {
    bookTitle.className = "invalid";
    bookTitle.setCustomValidity("Please enter title of the book");
    bookTitle.reportValidity();
  } else {
    bookTitle.setCustomValidity("");
    bookTitle.reportValidity();
  }
}

function showBookAuthorError() {
  console.log("author");
  if (bookAuthor.validity.valueMissing) {
    bookAuthor.className = "invalid";
    bookAuthor.setCustomValidity("Please enter author of the book");
    bookAuthor.reportValidity();
  } else {
    bookAuthor.setCustomValidity("");
    bookAuthor.reportValidity();
  }
}

function showBookPagesError() {
  console.log("pages");
  if (bookPages.validity.valueMissing) {
    bookPages.className = "invalid";
    bookPages.setCustomValidity("Please enter number of pages of the book");
    bookPages.reportValidity();
  } else if (bookPages.validity.patterMismatch) {
    bookPages.className = "invalid";
    bookPages.setCustomValidity("Please enter numeric value");
    bookPages.reportValidity();
  } else {
    bookPages.setCustomValidity("");
    bookPages.reportValidity();
  }
}

displayBooks();
