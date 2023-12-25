const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  section: {
    type: String,
    required: true,
  },
  squad: {
    type: String,
    required: true,
  },
  studyCase: {
    type: String,
    required: true,
  },
  Specialization: {
    type: String,
    required: true,
  },
  num: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Student", studentSchema);
