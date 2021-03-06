const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { check, validationResult } = require("express-validator");

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

router.post(
  "/",
  [
    check("title", "제목을 입력 해주세요.").not().isEmpty(),
    check("description", "내용이 너무 짧거나 너무 길어요.").isArray({
      min: 1,
      max: 4,
    }),
    check("link", "오픈 채팅 혹은 일대일 채팅 링크를 입력 해주세요.")
      .not()
      .isEmpty(),
    check("tags", "태그를 입력해 주세요 (최대 5개).").isArray({
      max: 5,
      min: 2,
    }),
  ],
  async (req, res) => {
    console.log(req.body);
    const { title, description, link, tags } = req.body;

    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      post = new Post({
        title,
        description,
        link,
        tags,
      });

      const savedPost = await post.save();

      return res.status(200).json({ savedPost });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: "Server error." });
    }
  }
);

module.exports = router;
