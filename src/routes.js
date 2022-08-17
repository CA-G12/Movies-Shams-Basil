const router = require("express").Router();
const { getAllFilms } = require("./controllers");

router.get("/api", getAllFilms);

module.exports = router;
