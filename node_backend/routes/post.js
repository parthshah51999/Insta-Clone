const express = require("express");
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");

router.get("/allposts", authenticateUser, (req, res) => {
  Post.find()
    .populate("postedBy", "id name email")
    .then((posts) => {
      res.json({ message: "success", posts });
    })
    .catch((err) => console.log(err));
});

router.get("/myposts", authenticateUser, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "id name email")
    .then((myPosts) => {
      res.json({ message: "success", posts: myPosts });
    })
    .catch((err) => console.log(err));
});

router.post("/createpost", authenticateUser, (req, res) => {
  const { title, body, url } = req.body;
  if (!title || !body || !url) {
    return res.status(422).json({ error: "Enter all mandatory fields" });
  }
  req.user.password = undefined;
  const post = Post({ title, body, postedBy: req.user, photo: url });

  post
    .save()
    .then((resultPost) => {
      res.json({ message: "success", post: resultPost });
    })
    .catch((err) => console.log(err));
});

router.post("/like", authenticateUser, (req, res) => {
  const { postId } = req.body;
  Post.findByIdAndUpdate(
    postId,
    { $push: { likes: req.user._id } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    return res.json(result);
  });
});

router.post("/unlike", authenticateUser, (req, res) => {
  const { postId } = req.body;
  Post.findByIdAndUpdate(
    postId,
    { $pull: { likes: req.user._id } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    return res.json(result);
  });
});

module.exports = router;
