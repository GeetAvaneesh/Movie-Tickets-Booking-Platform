const express = require("express");
const movieRoute = express.Router();
const MovieModel = require("../modelSchema/movieSchema");
const mongoose = require("mongoose");

// ... (other routes like POST, etc., are unchanged)
movieRoute.post("/add-movie", (req, res) => {
    MovieModel.create(req.body, (err, data) => {
        if (err) return err;
        else res.json(data);
    });
});


// THIS IS THE MODIFIED ROUTE
movieRoute.get("/", (req, res) => {
  // Debug message 1: Check if the route is being hit
  console.log("--- GET /movies route was hit at:", new Date().toLocaleTimeString());

  MovieModel.find((err, data) => {
    // Debug message 2: Log whatever the database returns
    console.log("Database find() error:", err);
    console.log("Database find() data:", data);

    if (err) {
      console.error("Sending error response to client.");
      return res.status(500).json(err); // Send a proper error response
    } else {
      console.log(`Found ${data.length} movies. Sending to client.`);
      res.json(data);
    }
  });
});


// ... (all your other routes like get-details, searchbyname, etc., are unchanged)
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