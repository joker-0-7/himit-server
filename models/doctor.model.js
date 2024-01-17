const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
  fristName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});
module.exports = mongoose.model("Doctor", doctorSchema);
