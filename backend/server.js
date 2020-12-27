const express = require("express");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 5000;
const path = require("path");
const axios = require("axios");
const fs = require("fs");

app.use(cors());

console.log(path.resolve(__dirname, "/build"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/build", "index.html"));
  });
}

app.get("/getLinks", (req, res) => {
  const API =
    "https://api.develope.kr/search/room/list?query=%EB%B2%A4%EC%BF%A0%EB%B2%84&type=m&page=1&count=100";

  axios(API)
    .then((response) => {
      // console.log(response.data);
      fs.writeFile("res.json", JSON.stringify(response.data), function (err) {
        console.log(err);
      });

      return res.json(response.data);
    })
    .catch((err) => {
      console.log(err.message);
      res.send(err);
    });
});

app.get("/search/:keyword", (req, res) => {});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
