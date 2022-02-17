const readSlide = document.querySelector(".slide");
const form = document.querySelector("form");
const addButton = document.querySelector(".add");
const backButton = document.querySelector(".back");
const confirmButton = document.querySelector(".confirm");
const main = document.querySelector("main");

function Book(name, author, pages) {
  this.name = name;
  this.author = author;
  this.nbOfPages = pages;
}

let books = [];

function handleSubmit(e) {
  e.preventDefault();
  form.classList.remove("open");
  const formDatas = new FormData(form);
  const name = formDatas.get("name");
  const author = formDatas.get("author");
  const nbOfPages = formDatas.get("nbOfPages");

  const book = new Book(name, author, nbOfPages);
  books.push(book);
  displayBooks(books);
}

function displayBooks(books) {
  main.innerHTML = "";
  divsCode = "";
  books.forEach((book) => {
    divsCode += `<div class="tile">
      <h4>${book.name}</h4>
      <p class="author">Author: ${book.author}</p>
      <p class="nop">Number of pages: ${book.nbOfPages}</p>
      <button class="toggle">Unread</button>
    </div>`;
  });
  main.innerHTML = divsCode;
}

//Display
readSlide.addEventListener("click", (e) => {
  if (readSlide.classList.contains("read")) {
    readSlide.classList.remove("read");
  } else {
    readSlide.classList.add("read");
  }
});

addButton.addEventListener("click", (e) => {
  form.classList.add("open");
});

backButton.addEventListener("click", (e) => {
  form.classList.remove("open");
});

//Actions
form.addEventListener("submit", handleSubmit);
