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
  fristName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  img: {
    type: String,
  },
});

module.exports = mongoose.model("User", Users);
