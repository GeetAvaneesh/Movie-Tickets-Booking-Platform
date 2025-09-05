const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    name: { type: String },
    length: { type: String },
    genre: { type: String },
    image: { type: String },
    banner: { type: String },
    rating: { type: Number },
    summary: { type: String },
    trailer: { type: String },
  },
  {
    collection: "movies",
  }
);

module.exports = mongoose.model("movieSchema", movieSchema);
