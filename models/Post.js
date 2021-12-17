const { date } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");

const { replySchema } = require('./reply');


const postSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: {type:String, default:0},
  replies: [{ type: replySchema }], 
  image: {type:String, default:""},
 

})

const Post = mongoose.model("Post", postSchema)

function validatePost(post) {
  const schema = Joi.object({
    userID: Joi.string().required(),
    text: Joi.string().min(1).max(244).required(),
    likes: Joi.number(),
    dislikes: Joi.number(),
    replies: Joi.array(),
    image: Joi.string()
  })
  return schema.validate(post)
}

module.exports.Post = Post
module.exports.validatePost = validatePost
