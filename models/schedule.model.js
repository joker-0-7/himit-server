const mongoose = require("mongoose");
const scheduleSchema = new mongoose.Schema({
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
module.exports = mongoose.model("Schedule", scheduleSchema);
