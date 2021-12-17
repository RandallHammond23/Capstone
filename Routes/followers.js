
const express = require("express");
const router = express.Router();
const {User, validateUser} = require("../models/User");









//follow someone
router.post("/:userId/follow/:followerId", async (req, res) => {
    try {
      const follower = await User.findById(req.params.followerId);
      if (!follower)
        return res.status(400).send(`The user with id "${req.params.followerId}" does not exist.`);
      if (follower.followersList.includes(req.params.userId))
         return res.status(400).send(`These users are already friends!`);
     
         follower.followersList.push(req.params.userId);
        await follower.save()
      return res.send(follower.followersList);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });










///delete friend request
// router.delete("/:userId/remove/:friendId", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user)
//       return res
//         .status(400)
//         .send(`The user with id "${req.params.userId}" does not exist.`);
//         const denied = (index) => index === req.params.followerId;
//     if (!denied)
//       return res
//         .status(400)
//         .send(`The friend with id "${req.params.followerId}" does not exist.`);
//         const removeReq = user.followerRequests.findIndex(denied)
//         user.followerRequests.splice(removeReq, 1)
//     await user.save();
//     return res.send(user.followerRequests);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });


module.exports = router