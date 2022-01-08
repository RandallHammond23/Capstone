const { date, number } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");
const { replySchema } = require("./reply");

const postSchema = new mongoose.Schema({
  // userId: { type: String, required: true },
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  // latitude: {type: number, require:true},
  // long: {type: number, require:true},
  // comments: {type:[], default:[]},
  // replies: [{ type: replySchema }],
  image: [{ type: String }],
});

const Post = mongoose.model("Post", postSchema);

function validatePost(post) {
  const schema = Joi.object({
    // userId: Joi.string().required(),
    text: Joi.string().min(1).max(244).required(),
    likes: Joi.number(),
    // comments: Joi.array(),
    // replies: Joi.array(),
    image: Joi.array(),
  });
  return schema.validate(post);
}

module.exports.Post = Post;
module.exports.validatePost = validatePost;
module.exports.postSchema = postSchema;
