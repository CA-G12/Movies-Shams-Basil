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

module.exports = { getAllFilms };
