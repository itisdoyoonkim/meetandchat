const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function fetchAPI() {
  const API =
    "https://api.develope.kr/search/room/list?query=%EB%B2%A4%EC%BF%A0%EB%B2%84&type=m&page=1&count=100";

  try {
    const res = await axios.get(API);
    const resPageTwo = await axios.get(
      "https://api.develope.kr/search/room/list?query=%EB%B2%A4%EC%BF%A0%EB%B2%84&type=m&page=2&count=100"
    );

    const list = [...res.data.result.lists, ...resPageTwo.data.result.lists];

    console.log(list.length);

    fs.writeFile(
      path.resolve("./res.json"),
      JSON.stringify(list),
      function (err) {
        console.log("Error while trying to write file:", err);
      }
    );
    return;
  } catch (error) {
    console.log("error from server: ", error.message);
    return error;
  }
}

fetchAPI();
