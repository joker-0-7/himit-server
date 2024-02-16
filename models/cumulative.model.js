const mongoose = require("mongoose");
const cumulativesSchema = mongoose.Schema(
  {
    user: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cumulatives", cumulativesSchema);
