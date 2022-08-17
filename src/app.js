const path = require(`path`);

const express = require(`express`);
const compression = require("compression");
const router = require("./routes");
const { handleClientError, handleServerError } = require("./controllers");
const app = express();

app.set(`port`, process.env.PORT || 8080);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(router);

app.use(handleClientError);
app.use(handleServerError);

module.exports = app;
