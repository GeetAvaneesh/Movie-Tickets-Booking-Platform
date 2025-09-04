const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema(
  {
    username: { type: String },
    feedback: { type: String },
    time: { type: String },
  },
  {
    collection: "feedback",
  }
);

module.exports = mongoose.model("feedbackSchema", feedbackSchema);
