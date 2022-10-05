"use strict";

let container = document.getElementById("container");

let addBtn = document.getElementById("addCreativeBtn");

let drawerContainer = document.getElementById("drawerContainer");

let done = document.getElementById("done");

let chooseClr = document.getElementById("chooseClr");
let chooseClr1 = document.getElementById("chooseClr1");

let itemsContainer = document.getElementById("itemsContainer");

let searchInput = document.getElementById("searchInput");

let myProgressBar = document.getElementById("progressBar");
let progressStatus = document.getElementById("progressStatus");

let titleInput = document.getElementById("title");
let subTitleInput = document.getElementById("subTitle");

let crossBtn = document.getElementById("crossBtn");

let backgroundColor = "0";

let addColorToChooseClr;

// functions

async function clrData() {
  let response = await fetch(
    "https://random-flat-colors.vercel.app/api/random?count=5"
  );

  let data = await response.json();

  data.colors.forEach((element) => {
    addColorToChooseClr = `
              <div class="custom-radio-button">

              <input bccolor="${element}" readonly class="checkmark" style="background-color: ${element};"></input>
</div>`;

    chooseClr.innerHTML += addColorToChooseClr;
    chooseClr1.innerHTML += addColorToChooseClr;
  });
}

clrData();

let count = 0;
function createCreativeList() {
  let titleText = titleInput.value;
  let subTitleText = subTitleInput.value;

  if (titleText == "" || subTitleText == "" || backgroundColor === "0") {
    alert("title, subtitle and background color are required");
    return;
  }
  count++;
  if (count <= 5) {
    let itemsBox = document.createElement("section");
    itemsBox.classList.add("itemsBox");
    itemsBox.id = "count";
    itemsBox.setAttribute("secColor", backgroundColor);

    let deleteBtn = document.createElement("span");
    deleteBtn.classList.add("deleteBtn");
    let title = document.createElement("h1");
    let subTitle = document.createElement("h3");

    deleteBtn.innerText = `X`;
    title.innerText = titleText;
    subTitle.innerText = subTitleText;

    itemsBox.appendChild(deleteBtn);
    itemsBox.appendChild(title);
    itemsBox.appendChild(subTitle);
    itemsBox.style.backgroundColor = backgroundColor;
    itemsContainer.appendChild(itemsBox);

    myProgressBar.value = count * 20;
    progressStatus.innerHTML = count;

    titleInput.value = "";
    subTitleInput.value = "";

    hideDrawerContainer();
  }
}

function hideDrawerContainer() {
  container.classList.remove("hideContainer");
  backgroundColor = "0";
  drawerContainer.style.display = "none";
  container.style.width = "100%";
  addBtn.disabled = false;
  titleInput.value = "";
  subTitleInput.value = "";
}

function disableOrEnableDoneBtn() {
  let titleText = titleInput.value;
  let subTitleText = subTitleInput.value;

  if (titleText == "" || subTitleText == "" || backgroundColor === "0") {
    return;
  }
  done.disabled = false;
}

function unFilterByColor(event) {
  let section = document.querySelectorAll(".itemsBox");

  for (let i = 0; i < section.length; i++) {
    if (
      section[i].style.display === "none" &&
      (event.target.tagName === "DIV" || event.target.tagName === "HTML")
    )
      section[i].style.display = "block";
  }
}

let searchCle = "";
function filterByColor(event) {
  // console.log(event.target.getAttribute("bccolor"));

  let filterColor = event.target.attributes.bccolor.nodeValue;
  let section = document.querySelectorAll(".itemsBox");

  for (let element of section) {
    let secColor = element.getAttribute("secColor");

    if (secColor === filterColor) {
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  }
}

function filter(searchValue) {
  let section = document.querySelectorAll(".itemsBox");
  for (let element of section) {
    let t = element.getElementsByTagName("h1")[0].innerHTML;
    let s = element.getElementsByTagName("h3")[0].innerHTML;

    if (
      t.toUpperCase().includes(searchValue.toUpperCase()) ||
      s.toUpperCase().includes(searchValue.toUpperCase())
    ) {
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  }
}

const deleteCart = (element) => {
  console.log(element);
  count = count - 1;
  myProgressBar.value = count * 20;
  progressStatus.innerHTML = count;
  element.parentElement.remove();
};

// logics

document.addEventListener("click", unFilterByColor);

searchInput.addEventListener("keyup", (event) => {
  filter(event.target.value);
});

addBtn.addEventListener("click", function (event) {
  done.disabled = true;
  if (count >= 5) {
    // addBtn.disabled = true;
    alert("you can not create more then 5 creatives");
  } else {
    drawerContainer.style.display = "block";
    addBtn.disabled = true;
  }
  if (!container.classList.contains("hideContainer")) {
    container.classList.add("hideContainer");
  }
});

titleInput.addEventListener("keyup", (event) => {
  disableOrEnableDoneBtn();
});

subTitleInput.addEventListener("keyup", (event) => {
  disableOrEnableDoneBtn();
});

done.addEventListener("click", function (event) {
  event.preventDefault();
  createCreativeList();
});

chooseClr.addEventListener("click", (event) => {
  if (event.target.tagName === "INPUT") {
    filterByColor(event);
  }
});

chooseClr1.addEventListener("click", (event) => {
  console.log(event);
  if (event.target.tagName === "INPUT") {
    backgroundColor = event.target.attributes.bccolor.nodeValue;
  }
  console.log(backgroundColor);
  disableOrEnableDoneBtn();
});

crossBtn.addEventListener("click", (event) => {
  hideDrawerContainer();
});
itemsContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "SPAN") {
    deleteCart(event.target);
  }
});
