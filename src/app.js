const path = require(`path`);

const express = require(`express`);
const app = express();

app.set(`port`, process.env.PORT || 8080);

module.exports = app;
