const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { JWT_KEY } = require("../keys");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "user must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "user must be logged in" });
    }

    const { _id } = payload;
    User.findById(_id).then((user) => {
      req.user = user;
      next();
    });
  });
};
