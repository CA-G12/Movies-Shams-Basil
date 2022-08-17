const path = require("path");
const fetch = require("node-fetch");

const getAllFilms = (req, res) => {
  fetch(`https://api.tvmaze.com/shows`, {
    Authorization: {
      Basic: process.env.API_KEY,
    },
  })
    .then((data) => data.json())
    .then((response) => res.send(response))
    .catch((err) =>
      res.status(404).sendFile(path.join(__dirname, "..", "public", "404.html"))
    );
};

const searchFilm = (req, res) => {
  const search = req.params.name;
  fetch(`https://api.tvmaze.com/shows`, {
    Authorization: {
      Basic: process.env.API_KEY,
    },
  })
    .then((data) => data.json())
    .then((response) => {
      res.json(
        response.filter((ele) => {
          return ele["name"]
            .toLowerCase()
            .includes(search.toLowerCase().split("%20").join(" "));
        })
      );
    })
    .catch((err) =>
      res.status(404).sendFile(path.join(__dirname, "..", "public", "404.html"))
    );
};


module.exports = { getAllFilms, searchFilm };
