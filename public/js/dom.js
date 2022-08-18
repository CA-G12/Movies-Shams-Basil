const container = document.querySelector(".container");
const suggestionDiv = document.querySelector('.suggestion');
const filmName = document.querySelector(".film-name");
const description = document.querySelector(".description");
const filmImg = document.querySelector(".image");
const btnSubmit = document.querySelector("#btn");
const input = document.querySelector("input");
const header = document.querySelector(`header`);
const main = document.querySelector(`main`);
const popUp = document.querySelector(`#pop-up`);
const loading = document.querySelector(`.loading`);

const showRandomFilms = (data) => {
  data
    .sort(() => Math.random() - 0.5)
    .slice(0, 200)
    .forEach((ele) => {
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
      btn.setAttribute(`data-id`, ele["id"])
      btn.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i>`;
      info.appendChild(btn);
    });
};

const showOneFilmRandomly = (data) => {
  let random = Math.floor(Math.random() * data.length - 1);
  console.log(data[random]["summary"])
  filmName.textContent = data[random]["name"];
  description.innerHTML = data[random]["summary"];
  filmImg.src = data[random]["image"]["original"];
};

fetch("/api")
  .then((data) => data.json())
  .then((res) => {
    showRandomFilms(res);
    showOneFilmRandomly(res);
  });

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
      .then((res) => {
        if(res.length === 0){
            suggestionDiv.style.display = 'none';
            container.innerHTML = `<img src="./img/no-results-found.png" />`
        }else {
            handleSearch(res);
            suggestionDiv.style.display = 'flex';
        }
        
    })
      .catch((err) => console.log(err, "Failed"));
  }
});

btnSubmit.addEventListener("click", () => {
  const { value } = input;
  fetch(`/search/${value}`)
    .then((data) => data.json())
    .then((res) => {
        if(res.length === 0){
            suggestionDiv.style.display = 'none';
            container.innerHTML = `<img src="./img/no-results-found.png" />`
        }else {
            handleSearch(res);
            suggestionDiv.style.display = 'flex';
        }
        
    })
    .catch((err) => console.log(err, "Failed"));
});

input.addEventListener("input", () => {
  const { value } = input;
  fetch(`/search/${value}`)
    .then((data) => data.json())
    .then((res) => {
        if(res.length === 0){
            suggestionDiv.style.display = 'none';
            container.innerHTML = `<img src="./img/no-results-found.png" />`
        }else {
            handleSearch(res);
            suggestionDiv.style.display = 'flex';
        }
        
    })
    .catch((err) => console.log(err, "Failed"));

});


setTimeout(() => {
  loading.style.display = `none`
  header.style.display = `flex`;
  main.style.display = `grid`;
}, 3000)