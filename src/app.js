const path = require(`path`);

const express = require(`express`);
const compression = require("compression");
const router = require("./routes");
const app = express();

app.set(`port`, process.env.PORT || 8080);
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(router);

module.exports = app;
