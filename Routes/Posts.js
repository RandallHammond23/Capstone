const express = require('express');
const { ObjectID } = require('mongodb');
const {Post, validatePost} = require('../models/Post');
const router = new express.Router();
const {User} = require('../models/User')

router.get('/', async (req, res) => {
    const posts = await Post.find().sort();
    res.status(200).json(posts);
  });




  //add posts

  // router.post('/:userId/posts',  async (req, res) => {
  //   try {
  //     const { error } = validatePost(req.body)
  //     if (error) return res.status(400).send(error)
  
  //     const user = await User.findById(req.params.userId)
  //     if (!user) return res.status(400).send(
  //       `The user with id: "${req.params.userId}" does not exist.`
  //     )
      
  //     const post = new Post({
  //       userID: req.body.userID,
  //       text: req.body.text,
  //       likes: req.body.likes,
  //       disLikes: req.body.disLikes
  //     })
  //     User.posts.push(post)
  //     await User.save()
  
  //     return res.send(post)
  //   } catch (ex) {
  //     return res.status(500).send(`Internal Server Error: ${ex}`)
  //   }
  // })
  




  router.post("/:userId/posts", async (req, res) => {
    try {
      const { error } = validatePost(req.body);
  
      if (error) return res.status(400).send(error);
      // Need to validate body before continuing
  
      const post = new Post({
        userID: req.body.userID,
        text: req.body.text,
        likes: 0,
        dislikes: 0,
        
      });
      User.posts.push(post)
      await post.save();
  
      return res.send(post);
    } catch (err) {
      return res.status(500).send(`Internal Server Error: ${err}`);
    }
  });







 
  
  router.delete('/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      await post.remove();
      return res.json({ success: true });
    } catch (err) {
      return res.status(404).send(err);
    }
  });
  
  module.exports = router;

