const mongoose = require('mongoose');
const Joi = require('joi');
const { replySchema } = require('./Reply');
// C -- code out the SCHEMA and MODEL for COMMENT and REPLY

const commentSchema = new mongoose.Schema({
    videoID:{type:String, required:true },
    text: { type: String, required: true, minlength: 1, maxlength: 255 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    replies: [{ type: replySchema }],
});




const validateComment = (comment) => {
    const validator = Joi.object({
       videoID: Joi.string().min(4).max(255).required(),
       text: Joi.string().min(1).max(255).required(),
       likes: Joi.number(),
       dislikes: Joi.number(),
       replies: Joi.array(),
    });
    return validator.validate(comment)
}

const Comment = mongoose.model("Comment", commentSchema);


// E -- export the MODEL so we can access these instructions elsewhere
module.exports.Comment = Comment;
module.exports.validateComment = validateComment;
