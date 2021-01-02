const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const connectToDB = require("./db");
const data = require("./res.json");

const port = process.env.PORT || 5000;

connectToDB();

app.use(cors());
app.use(express.json({ extended: false }));

app.use("/meetups", require("./routes/post"));

app.get("/getLinks", (req, res) => {
  console.log("data exists: ", data.success);
  console.log("number of results: ", data.result.totalcount);
  console.log("current page being queried: ", data.result.page);
  res.send(data);
});

// app.get("/getLinks", (req, res) => {
//   const API =
//     "https://api.develope.kr/search/room/list?query=%EB%B2%A4%EC%BF%A0%EB%B2%84&type=m&page=1&count=100";

//   axios(API)
//     .then((response) => {
//       // console.log(response.data);
//       fs.writeFile(
//         path.resolve(`./frontend/src/res.json`),
//         JSON.stringify(response.data),
//         function (err) {
//           console.log("error from file writing:", err);
//         }
//       );
//       return res.json(response.data);
//     })
//     .catch((err) => {
//       console.log("error from server: ", err.message);
//       res.send(err);
//     });
// });

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });

  app.use(express.static(path.join(__dirname, "frontend/build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  });
}

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
