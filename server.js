const express = require("express");
const mysql = require("mysql2");
const app = express();

const pool = mysql.createPool({
  connectionLimit : 4,
  host : "127.0.0.1",
  user : "root",
  password : "1234",
  database : "TEST"
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/front/index.html");
});

app.get("/data", (req, res) => {
  pool.query("select * from test", (error, result) => {
    res.send(result);
    console.log("request temp");
  });
});

app.use(express.static(__dirname + "/front"));

app.use((req, res, next) => {
  res.status(404).send("Not found");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
