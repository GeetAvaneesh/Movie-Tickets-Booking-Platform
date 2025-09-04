const express = require("express");
const movieRoute = express.Router();
const movieSchema = require("../modelSchema/movieSchema");
const mongoose = require("mongoose");

movieRoute.post("/add-movie", (req, res) => {
  movieSchema.create(req.body, (err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

movieRoute.get("/", (req, res) => {
  movieSchema.find((err, data) => {
    if (err) return err;
    else res.json(data);
  });
});
movieRoute.get("/get-details/:id", (req, res) => {
  movieSchema.findById(mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) return err;
    else res.json(data);
  });
});
movieRoute.get("/searchbyname/:partialName", async (req, res) => {
  try {
    const partialName = req.params.partialName.trim();
    const regex = new RegExp(partialName, "i"); // Case-insensitive regex
    const movies = await movieSchema.find({ name: regex });
    res.json(movies);
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

movieRoute.get("/searchbygenre/:genre", async (req, res) => {
  try {
    const genre = req.params.genre.trim();
    const regex = new RegExp(genre, "i"); // Case-insensitive regex
    const movies = await movieSchema.find({ genre: regex });
    res.json(movies);
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
movieRoute
  .route("/update-movie/:id")
  .get((req, res) => {
    movieSchema.findById(
      mongoose.Types.ObjectId(req.params.id),
      (err, data) => {
        if (err) return err;
        else res.json(data);
      }
    );
  })
  .put((req, res) => {
    movieSchema.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      { $set: req.body },
      (err, data) => {
        if (err) return err;
        else res.json(data);
      }
    );
  });

movieRoute.delete("/delete-movie/:id", (req, res) => {
  movieSchema.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id),
    (err, data) => {
      if (err) return err;
      else res.json(data);
    }
  );
});

module.exports = movieRoute;
