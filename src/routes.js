const router = require("express").Router();
const { getAllFilms, searchFilm } = require("./controllers");

router.get("/api", getAllFilms);
router.get("/search/:name", searchFilm)

module.exports = router;
