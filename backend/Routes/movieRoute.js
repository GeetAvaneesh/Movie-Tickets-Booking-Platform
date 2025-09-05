const express = require("express");
const movieRoute = express.Router();
// Renamed the imported model for clarity
const MovieModel = require("../modelSchema/movieSchema"); 
const mongoose = require("mongoose");

movieRoute.post("/add-movie", (req, res) => {
  MovieModel.create(req.body, (err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

movieRoute.get("/", (req, res) => {
  MovieModel.find((err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

movieRoute.get("/get-details/:id", (req, res) => {
  MovieModel.findById(mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

movieRoute.get("/searchbyname/:partialName", async (req, res) => {
  try {
    const partialName = req.params.partialName.trim();
    const regex = new RegExp(partialName, "i"); // Case-insensitive regex
    const movies = await MovieModel.find({ name: regex });
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
    const movies = await MovieModel.find({ genre: regex });
    res.json(movies);
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

movieRoute
  .route("/update-movie/:id")
  .get((req, res) => {
    MovieModel.findById(
      mongoose.Types.ObjectId(req.params.id),
      (err, data) => {
        if (err) return err;
        else res.json(data);
      }
    );
  })
  .put((req, res) => {
    MovieModel.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      { $set: req.body },
      (err, data) => {
        if (err) return err;
        else res.json(data);
      }
    );
  });

movieRoute.delete("/delete-movie/:id", (req, res) => {
  MovieModel.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id),
    (err, data) => {
      if (err) return err;
      else res.json(data);
    }
  );
});

module.exports = movieRoute;