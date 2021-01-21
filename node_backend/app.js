const { MONGO_URL, PORT } = require("./keys");

const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo db...");
});

mongoose.connection.on("error", (error) => {
  console.log("error when connecting mongo db...", error);
});

require("./models/user");
require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => console.log("server running on", PORT));
