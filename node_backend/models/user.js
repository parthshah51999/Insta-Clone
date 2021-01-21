const mongoose = require("mongoose");
const schemaObj = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
};

const userSchema = new mongoose.Schema(schemaObj);
mongoose.model("User", userSchema);
