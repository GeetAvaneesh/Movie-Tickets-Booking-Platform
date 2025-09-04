const express = require("express");
const adminRoute = express.Router();
const mongoose = require("mongoose");
const adminSchema = require("../modelSchema/adminSchema");

adminRoute.get("/get-password/:email", (req, res) => {
  adminSchema.findOne({ email: req.params.email }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

module.exports = adminRoute;
