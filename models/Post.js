const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
  },
  name: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("posts", PostSchema);
