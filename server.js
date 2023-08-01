const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/data", (req, res) => {
  let response = {
    j : 10,
    i : "temp"
  }
  res.send(response);

  console.log("request temp");
});

app.use(express.static(__dirname));


app.use((req, res, next) => {
  res.status(404).send("Not found");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
