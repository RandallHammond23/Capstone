const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken')
// C -- code out the SCHEMA and MODEL for COMMENT and REPLY

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    email: { type: String, unique: true, required: true, minlength: 5, maxlength: 255 },
    password: { type: String, required: true, minlength: 5, maxlength: 1024 },
    isAdmin: { type: Boolean, default: false },
    followersList: [{ type: mongoose.Types.ObjectId, default: [] }],
    followRequests: [{type: mongoose.Types.ObjectId, default:[]}],
    posts: { type: Array, default: [] },
    dateJoined: { type: Date, default: Date.now }
  })



  // userSchema.methods.generateAuthToken = function() {
  //   return jwt.sign({ _id: this._id, firstName: this.firstName, lastName: this.lastName,  isAdmin: this.isAdmin }, process.env.JWT)}




    const User = mongoose.model('User', userSchema)

    const validateUser = (user) => {
      const schema = Joi.object({
        firstName: Joi.string().max(50).required(),
        lastName: Joi.string().max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
      })
      return schema.validate(user)
    }
    
    exports.User = User
    exports.validateUser = validateUser
    