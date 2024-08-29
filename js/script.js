const myLibrary = [];

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".add");
const closeButton = document.querySelector(".close-modal");
const createButton = document.querySelector(".create");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");
const bookRead = document.querySelector("#bookRead");
const form = document.querySelector("form.form");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

createButton.addEventListener("click", createButtonClick, false);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function createButtonClick(event) {
  event.preventDefault();

  let createdBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.checked
  );
  myLibrary.push(createdBook);
  form.reset();
  dialog.close();
  displayBooks();
}

let book1 = new Book("HP", "Rowling", 520, false);

let book2 = new Book("Klub Zahad", "neznam", 123, true);

let book3 = new Book("Hobbit", "Tolkien", 1250, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

function addBookToLibrary(book) {
  myLibrary.push(book);
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

function deleteBook(bookIndex) {
  myLibrary.splice(bookIndex, 1);
  displayBooks();
}

function changeReadStatus(bookIndex) {
  myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
  displayBooks();
}

function displayBooks() {
  let tableBody = document.querySelector(".tableBody");
  let newTbody = document.createElement("tbody");
  newTbody.setAttribute("class", "tableBody");
  for (let book in myLibrary) {
    let currentBook = myLibrary[book];
    let newRow = newTbody.insertRow(-1);

    let titleCell = newRow.insertCell(0);
    let newTitle = document.createTextNode(currentBook.title);
    titleCell.appendChild(newTitle);

    let authorCell = newRow.insertCell(1);
    let newAuthor = document.createTextNode(currentBook.author);
    authorCell.appendChild(newAuthor);

    let pagesCell = newRow.insertCell(2);
    let newPages = document.createTextNode(currentBook.pages);
    pagesCell.appendChild(newPages);

    let readCell = newRow.insertCell(3);
    readCell.setAttribute("class", "checkbox-cell");
    let newReadCheckbox = createReadCheckbox(book);
    newReadCheckbox.checked = currentBook.read;
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
    deleteCell.appendChild(createDeleteButton(book));
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

displayBooks();
