const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fristName: {
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
    specialization: {
      type: String,
      required: true,
    },
    num: {
      type: Number,
      required: true,
    },
    seatingNumbers: {
      type: Number,
      default: null,
    },
    committeeNumber: {
      type: Number,
      default: null,
    },
    markers: [],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Student", studentSchema);
