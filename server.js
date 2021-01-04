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
  console.log("data exists: ", data.length);
  res.send(data);
});

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
