const container = document.querySelector(".container");
const filmName = document.querySelector(".film-name");
const description = document.querySelector(".description");
const filmImg = document.querySelector(".image");
const btnSubmit = document.querySelector("#btn");
const input = document.querySelector("input");

/******************************************************/
const handleSearch = (data) => {
  container.textContent = "";
  data.forEach((ele) => {
    const cerateCard = document.createElement("div");
    cerateCard.className = "card";
    container.appendChild(cerateCard);

    const img = document.createElement("img");
    img.src = ele["image"]["original"];
    cerateCard.appendChild(img);

    const info = document.createElement("div");
    info.className = "info";
    const title = document.createElement("h3");
    title.textContent = ele["name"];
    info.appendChild(title);
    cerateCard.appendChild(info);

    const btn = document.createElement("button");
    btn.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i>`;
    info.appendChild(btn);
  });
};

input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    const { value } = input;
    fetch(`/search/${value}`)
      .then((data) => data.json())
      .then((res) => handleSearch(res))
      .catch((err) => console.log(err, "Failed"));
  }
});

btnSubmit.addEventListener("click", () => {
  const { value } = input;
  fetch(`/search/${value}`)
    .then((data) => data.json())
    .then((res) => handleSearch(res))
    .catch((err) => console.log(err, "Failed"));
});

input.addEventListener("input", () => {
  const { value } = input;
  fetch(`/search/${value}`)
    .then((data) => data.json())
    .then((res) => handleSearch(res))
    .catch((err) => console.log(err, "Failed"));
});
