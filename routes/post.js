const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error." });
  }
});

router.get("/:post_id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error(error.message);

    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found." });
    }

    return res.status(500).json({ msg: "Server error." });
  }
});

router.post("/", async (req, res) => {
  const { title, description, link } = req.body;

  try {
    post = new Post({
      title,
      description,
      link,
    });

    const savedPost = await post.save();

    return res.status(200).json({ savedPost });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error." });
  }
});

module.exports = router;
