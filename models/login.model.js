const mongoose = require("mongoose");
const Users = new mongoose.Schema({
  num: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", Users);
