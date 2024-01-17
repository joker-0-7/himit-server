const mongoose = require("mongoose");
const aboutAppSchema = new mongoose.Schema({
  GoalApplication: {
    type: String,
  },
  UsagePolicy: {
    type: String,
  },
  VisionAndMission: {
    type: String,
  },
});
module.exports = mongoose.model("AboutApp", aboutAppSchema);
