const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    mobile: { type: Number },
    dob: { type: String },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("userSchema", userSchema);
