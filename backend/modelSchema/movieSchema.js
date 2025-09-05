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
    // You can keep this, but it's not necessary if you follow the naming convention
    collection: "movies", 
  }
);

// FIX: Change "movieSchema" to the singular name "Movie"
module.exports = mongoose.model("Movie", movieSchema);