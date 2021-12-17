const { Comment, validateComment } = require("../Models/Comment");
const { Reply, validateReply } = require("../Models/Reply");
const express = require("express");
const router = express.Router();

// All endpoints and route handlers go here
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    return res.send(comments);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment)
      return res
        .status(400)
        .send(`The comment with id "${req.params.id}" does not exist.`);

    return res.send(comment);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateComment(req.body);

    if (error) return res.status(400).send(error);
    // Need to validate body before continuing

    const comment = new Comment({
      postID: req.body.postID,
      text: req.body.text,
      likes: 0,
      dislikes: 0,
      replies: [],
    });
    await comment.save();

    return res.send(comment);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error);

    const comment = await Comment.findByIdAndUpdate(req.params.id,
      {
        videoID: req.body.videoID,
        text: req.body.text,
        likes: req.body.likes,
        dislikes: req.body.dislikes
      },
      { new: true }
    );

    if (!comment)
      return res
        .status(400)
        .send(`The comment with id "${req.params.id}" does not exist.`);
        
    await comment.save();

    return res.send(comment);
  } catch (err) {
    return res.send(500).send("Internal Server Error: ${err}");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndRemove(req.params.id);
    if (!comment)
      return res
        .status(400)
        .send(`The comment with id "${req.params.id}" does not exist.`);

    return res.send(comment);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});



//replies 

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    return res.send(comments);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

router.get("/:id/replies", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment)
      return res
        .status(400)
        .send(`The comment with id "${req.params.id}" does not exist.`);

    return res.send(comment);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

router.post("/:id/replies", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment)
    return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

    // Need to validate body before continuing

    const reply = new Reply({
      text: req.body.text,
      likes: 0,
      dislikes: 0,
    });

    comment.replies.push(reply);
    await comment.save();

    return res.send(comment.replies);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

router.delete("/:id/replies", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndRemove(req.params.id);
    if (!comment)
      return res
        .status(400)
        .send(`The comment with id "${req.params.id}" does not exist.`);

    return res.send(comment);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

router.put("./:id/replies", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        videoID: req.body.videoID,
        text: req.body.text,
        likes: 0,
        dislikes: 0,
        replies: [],
      },
      { new: true }
    );
    if (!comment)
      return res
        .status(400)
        .send(`The comment with id "${req.params.id}" does not exist.`);
    await comment.save();
    return res.send(comment);
  } catch (err) {
    return res.send(500).send("Internal Server Error: ${err}");
  }
});

module.exports = router;
