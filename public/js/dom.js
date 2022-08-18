const container = document.querySelector(".container");
const suggestionDiv = document.querySelector('.suggestion');
const filmName = document.querySelector(".film-name");
const description = document.querySelector(".description");
const filmImg = document.querySelector(".image");
const btnSubmit = document.querySelector("#btn");
const input = document.querySelector("input");
const header = document.querySelector(`header`);
const main = document.querySelector(`main`);
const loading = document.querySelector(`.loading`);
const popUp = document.querySelector("#pop-up");
const cancel = document.querySelector("#cancel");

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

      btn.addEventListener("click", () => {
        popUp.style.display = "flex";
        let obj = {
          name: ele["name"],
          rating: ele["rating"]["average"],
          genre: ele["genres"],
          premiered: ele["premiered"],
          image: ele["image"]["original"],
          summary: ele["summary"],
          language: ele["language"],
          link_url: ele['url']
        };
        showDetails(obj);
        let dataArray = JSON.parse(localStorage.getItem("series") || " []");
        dataArray[0] = obj;

        localStorage.setItem("series", JSON.stringify(dataArray));
      });
    });
};
/*********************************************************/
const image = document.querySelector(".photo img");
const filmTitle = document.querySelector(".description h1");
const rating = document.querySelector(".rating");
const language = document.querySelector(".lang");
const genre = document.querySelector(".genre");
const premiered = document.querySelector(".premiered");
const summary = document.querySelector(".summary");
const link = document.querySelector('.link');

const showDetails = (dataArray) => {
  if (dataArray) {
    image.src = dataArray["image"];
    filmTitle.textContent = dataArray["name"];
    rating.textContent = dataArray["rating"];
    language.textContent = dataArray["language"];
    genre.textContent = dataArray["genre"];
    premiered.textContent = dataArray["premiered"];
    summary.innerHTML = dataArray["summary"];
    link.href = dataArray['link_url']

  }
};
cancel.addEventListener("click", () => {
  popUp.style.display = "none";
});
/*********************************************************/
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

    btn.addEventListener("click", () => {
      popUp.style.display = "flex";
      let obj = {
        name: ele["name"],
        rating: ele["rating"]["average"],
        genre: ele["genres"],
        premiered: ele["premiered"],
        image: ele["image"]["original"],
        summary: ele["summary"],
        language: ele["language"],
        link_url: ele['url']
      };
      showDetails(obj);
      let dataArray = JSON.parse(localStorage.getItem("series") || " []");
      dataArray[0] = obj;

      localStorage.setItem("series", JSON.stringify(dataArray));
    });
  });
};

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