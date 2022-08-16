const app = require(`./app`);

app.listen(app.get(`port`), () => {
  console.log(`App running at port http://localhost/${app.get(`port`)}`);
});
