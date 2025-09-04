const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    seatId: String,
    isOccupied: {
      type: Boolean,
      default: false,
    },
    userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "showdb",
  }
);

const showSchema = new mongoose.Schema({
  showName: String,
  location: String,
  theater: String,
  date: Date,
  time: String,
  seats: [seatSchema],
});

module.exports = mongoose.model("showdb", showSchema);
