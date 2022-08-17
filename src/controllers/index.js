const { getAllFilms, searchFilm } = require("./film");
const { handleClientError, handleServerError } = require("./error");

module.exports = { getAllFilms, searchFilm, handleClientError, handleServerError };
