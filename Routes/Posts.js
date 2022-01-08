const express = require("express");
const { ObjectID } = require("mongodb");
const { Post, validatePost } = require("../models/Post");
const router = new express.Router();
const { User } = require("../models/User");
const fileUpload = require("../middleware/file-upload");

// get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    return res.send(posts);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

// show post from single user
router.get("/:id", async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);

    if (!posts)
      return res
        .status(400)
        .send(`The posts with id "${req.params.id}" does not exist.`);
    return res.send(posts);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

//add posts and add image to initial empty array

router.post("/:userId/posts", fileUpload.single("image"), async (req, res) => {
  try {
    const { error } = validatePost(req.body);

    if (error) return res.status(400).send(error);

    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`The user with id "${req.params.userId}" does not exist.`);

    const post = new Post({
      text: req.body.text,
      // comments: req.body.comments,
      // replies: req.body.replies,
      likes: 0,
    });
    post.image.push(req.file.path);
    user.posts.push(post);
    await user.save();

    return res.send(user);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

// TODO: Add another image to user's post
router.post(
  "/:userId/posts/:postId",
  fileUpload.single("image"),
  async (req, res) => {
    try {
      const { error } = validatePost(req.body);

      if (error) return res.status(400).send(error);

      const user = await User.findById(req.params.userId);
      if (!user)
        return res
          .status(400)
          .send(`The user with id "${req.params.userId}" does not exist.`);

      try {
        let post = user.posts.id(req.params.postId);

        post = {
          text: req.body.text,
          // comments: req.body.comments,
          // replies: req.body.replies,
          likes: 0,
          image: image.push(req.file.path),
        };
      } catch (err) {
        return res.status(450).send(`Couldn't use posts.id()`);
      }

      await user.save();

      return res.send(user.posts);
    } catch (err) {
      return res.status(500).send(`Internal Server Error: ${err}`);
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.remove();
    return res.json({ success: true });
  } catch (err) {
    return res.status(404).send(err);
  }
});

module.exports = router;
