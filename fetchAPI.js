const axios = require("axios");
const fs = require("fs");
const path = require("path");
// const data = require("./frontend/src/res.json");

function fetchAPI() {
  const API =
    "https://api.develope.kr/search/room/list?query=%EB%B2%A4%EC%BF%A0%EB%B2%84&type=m&page=1&count=100";

  axios(API)
    .then((response) => {
      // console.log(response.data);
      fs.writeFile(
        path.resolve(`./res.json`),
        JSON.stringify(response.data),
        function (err) {
          console.log("error from file writing: ", err);
        }
      );
      return;
    })
    .catch((err) => {
      console.log("error from server: ", err.message);
      return err;
    });
}

fetchAPI();
