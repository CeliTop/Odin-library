const readSlide = document.querySelector(".slide");
const form = document.querySelector("form");
const addButton = document.querySelector(".add");
const backButton = document.querySelector(".back");
const confirmButton = document.querySelector(".confirm");

const main = document.querySelector("main");

function handleSubmit(e) {
  e.preventDefault();
  console.log(e);
  console.log("odfgjlkj");
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
