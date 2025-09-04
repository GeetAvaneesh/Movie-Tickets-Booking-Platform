const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
  },
  {
    collection: "admins",
  }
);

module.exports = mongoose.model("adminSchema", adminSchema);
