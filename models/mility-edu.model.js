const mongoose = require("mongoose");

const MilitaryEducationSchema = new mongoose.Schema({
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  studentId: {
    type: String,
  },
  num: {
    type: Array,
  },
});
module.exports = mongoose.model("MilitaryEdu", MilitaryEducationSchema);
