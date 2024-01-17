const mongoose = require("mongoose");
const ExamsTables = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  classRoom: {
    type: String,
    required: true,
  },
  academicDivision: {
    type: String,
    required: true,
  },
  days: [],
});
module.exports = mongoose.model("ExamsTable", ExamsTables);
