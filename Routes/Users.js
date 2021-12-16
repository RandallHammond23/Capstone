const express = require("express");
const router = express.Router();
const {User, validateUser} = require("../models/User")
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken');
// const auth = require('../middleware/auth');





router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      return res.send(users);
    } catch (err) {
      return res.status(500).send(`Internal Server Error: ${err}`);
    }
  });



  router.post("/", async (req, res) => {
    try {
      const { error } = validateUser(req.body);
  
      if (error) return res.status(400).send(error);
      // Need to validate body before continuing
  
      const users = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      });
      await users.save();
  
      return res.send(users);
    } catch (err) {
      return res.status(500).send(`Internal Server Error: ${err}`);
    }
  });