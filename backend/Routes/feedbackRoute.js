const express = require("express");
const feedbackRoute = express.Router();
const mongoose = require("mongoose");
const feedbackSchema = require("../modelSchema/feedbackSchema");

feedbackRoute.post("/add-feedback", (req, res) => {
  feedbackSchema.create(req.body, (err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

feedbackRoute.get("/", (req, res) => {
  feedbackSchema.find((err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

feedbackRoute.delete("/delete-feedback/:id", (req, res) => {
  feedbackSchema.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id),
    (err, data) => {
      if (err) return err;
      else res.json(data);
    }
  );
});

module.exports = feedbackRoute;
