const mongoose = require("mongoose");

const MilitaryEducationSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
  },
  squad: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  studentId: {
    type: String,
    unique: true,
  },
  num: {
    type: Array,
  },
});
module.exports = mongoose.model("MilitaryEdu", MilitaryEducationSchema);
