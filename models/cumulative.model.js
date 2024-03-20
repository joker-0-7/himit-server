const mongoose = require("mongoose");
const cumulativesSchema = mongoose.Schema(
  {
    user: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cumulatives", cumulativesSchema);
