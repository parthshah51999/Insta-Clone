const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../keys");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res
      .status(422)
      .json({ error: "Please provide all mandatory fields" });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "Email Id is already registered" });
      }

      return bcrypt
        .hash(password, 12)
        .then((hashedPwd) => {
          const user = new User({ name, email, password: hashedPwd });
          user
            .save()
            .then((user) => {
              res.json({
                message: "posted successfully",
                user: { name: user.name, email: user.email },
              });
            })
            .catch((err) => console.log("error in posting", err));
        })
        .catch((err) => console.log("error in hashing password", err));
    })
    .catch((err) => console.log("error in posting", err));
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Enter valid credentials" });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Enter valid email or password" });
      }

      bcrypt
        .compare(password, savedUser.password)
        .then((isAuth) => {
          if (isAuth) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_KEY);
            const { _id, name, email } = savedUser;
            return res.json({
              message: "sign in successful",
              token,
              user: { _id, name, email },
            });
          }
          return res.status(422).json({ error: "Enter valid credentials" });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
