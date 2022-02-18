//Getting the books data
const JsonData = JSON.parse(localStorage.getItem("books")) || [];
const books = JsonData.map((element) => {
  return new Book(
    element.name,
    element.author,
    element.nbOfPages,
    element.read,
    element.index
  );
});

const readSlide = document.querySelector(".slide");
const form = document.querySelector("form");
const addButton = document.querySelector(".add");
const backButton = document.querySelector(".back");
const confirmButton = document.querySelector(".confirm");
const main = document.querySelector("main");
const log = document.querySelector(".log");
const dataElements = {
  total: log.querySelector(".total"),
  read: log.querySelector(".read"),
  unread: log.querySelector(".unread"),
};

//Constructor
function Book(name, author, pages, read, index) {
  this.name = name;
  this.author = author;
  this.nbOfPages = pages;
  this.read = read;
  this.index = index;
}

Book.prototype.changeReadStatus = function () {
  this.read = !this.read;
};

function handleSubmit(e) {
  e.preventDefault();
  form.classList.remove("open");
  const formDatas = new FormData(form);
  const name = formDatas.get("name");
  const author = formDatas.get("author");
  const nbOfPages = formDatas.get("nbOfPages");
  const read = readSlide.classList.contains("read");
  const index = books.length;

  const book = new Book(name, author, nbOfPages, read, index);
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks(books);
}

function displayBooks(books) {
  divsCode = "";
  books.forEach((book) => {
    divsCode += `
      <div class="tile" data-index="${book.index}">
      <h4>${book.name}</h4>
      <p class="author">Author: ${book.author}</p>
      <p class="nop">Number of pages: ${book.nbOfPages}</p>
     ${
       book.read
         ? "<button class='toggle read'>Read</button>"
         : "<button class='toggle'>Unread</button>"
     }
      <button class="delete">
        <img class="to-delete" src="./cross-sign-svgrepo-com.svg" alt="cross" />
      </button>
    </div>`;
  });
  main.innerHTML = divsCode;
  changeLogs(books);
}

function switchToggle(target) {
  changeReadClass(target);
  setTimeout(
    () =>
      (target.innerText = target.classList.contains("read")
        ? "Read"
        : "Unread"),
    50
  );
  books[target.parentElement.dataset.index].changeReadStatus();
  localStorage.setItem("books", JSON.stringify(books));
  changeLogs(books);
}

function changeReadClass(target) {
  if (target.classList.contains("read")) {
    target.classList.remove("read");
  } else {
    target.classList.add("read");
  }
}

function changeLogs(books) {
  let total = 0,
    read = 0,
    unread = 0;
  const datas = books.reduce((_, book) => {
    total++;
    if (book.read) {
      read++;
    } else {
      unread++;
    }
  }, 0);
  dataElements.total.innerText = `Total: ${total}`;
  dataElements.read.innerText = `Read: ${read}`;
  dataElements.unread.innerText = `Unread: ${unread}`;
}

//Display
readSlide.addEventListener("click", () => {
  changeReadClass(readSlide);
});

addButton.addEventListener("click", (e) => {
  form.classList.add("open");
});

backButton.addEventListener("click", (e) => {
  form.classList.remove("open");
});

//Actions
form.addEventListener("submit", handleSubmit);
document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("toggle")) {
    switchToggle(e.target);
  } else if (e.target && e.target.classList.contains("to-delete")) {
    let index = e.target.parentElement.parentElement.dataset.index;
    books.splice(index, 1);
    //We store the books to the right place in the array
    for (let i = index; i < books.length; i++) {
      books[i].index--;
    }
    displayBooks(books);
    localStorage.setItem("books", JSON.stringify(books));
  }
});

displayBooks(books);
