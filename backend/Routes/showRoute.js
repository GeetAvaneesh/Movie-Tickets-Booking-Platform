const express = require("express");
const showSchema = require("../modelSchema/showSchema");
const showRoute = express.Router();
const mongoose = require("mongoose");

const createShowForDateAndTime = async (
  showName,
  date,
  time,
  location,
  theater
) => {
  try {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const seats = [];

    for (let row of rows) {
      for (let i = 1; i <= 8; i++) {
        seats.push({
          seatId: `${row}${i}`,
          isOccupied: false,
          userDetails: null,
        });
      }
    }

    const show = new showSchema({
      showName,
      location,
      theater,
      date,
      time,
      seats,
    });
    await show.save();
  } catch (error) {
    console.error(error);
  }
};

const removeOldShows = async () => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    await showSchema.deleteMany({ date: { $lt: currentDate } });
  } catch (error) {
    console.error(error);
  }
};

showRoute.post("/createshow", async (req, res) => {
  try {
    await removeOldShows();
    let flag = true;
    let finaldata = null;
    const time = req.body.time;
    const showdate = new Date(req.body.date);
    const showname = req.body.showName;
    const location = req.body.location;
    const theater = req.body.theater;
    const data = {
      showName: showname,
      location: location,
      theater: theater,
      time: time,
      date: { $eq: showdate },
    };
    const existingShow = await showSchema.findOne(data);
    if (existingShow) {
      flag = false;
      finaldata = existingShow;
    } else {
      await createShowForDateAndTime(
        showname,
        showdate,
        time,
        location,
        theater
      );
      const newlyCreatedShow = await showSchema.findOne(data);

      if (newlyCreatedShow) {
        flag = false;
        finaldata = newlyCreatedShow;
      }
    }
    res.json(finaldata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

showRoute.get("/alldetails", async (req, res) => {
  const showsDetails = [];
  const showsData = await showSchema.find();
  showsData.forEach((show) => {
    const freeSeats = show.seats.filter((seat) => !seat.isOccupied).length;
    const occupiedSeats = show.seats.filter((seat) => seat.isOccupied).length;
    const showDetailsWithSeats = {
      showDetails: {
        showName: show.showName,
        location: show.location,
        theater: show.theater,
        date: show.date,
        time: show.time,
        totalSeats: show.seats.length,
      },
      seatStatus: {
        freeSeats,
        occupiedSeats,
      },
    };

    showsDetails.push(showDetailsWithSeats);
  });

  res.json(showsDetails);
});

showRoute.get("/userBookedSeats/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookedShows = await showSchema.aggregate([
      {
        $match: {
          "seats.userDetails": mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: {
            showName: "$showName",
            location: "$location",
            theater: "$theater",
            date: "$date",
            time: "$time",
          },
          totalSeatsBooked: {
            $sum: {
              $size: {
                $filter: {
                  input: "$seats",
                  as: "seat",
                  cond: {
                    $eq: [
                      "$$seat.userDetails",
                      mongoose.Types.ObjectId(userId),
                    ],
                  },
                },
              },
            },
          },
          seatIds: {
            $push: {
              $map: {
                input: {
                  $filter: {
                    input: "$seats",
                    as: "seat",
                    cond: {
                      $eq: [
                        "$$seat.userDetails",
                        mongoose.Types.ObjectId(userId),
                      ],
                    },
                  },
                },
                as: "seat",
                in: "$$seat.seatId",
              },
            },
          },
        },
      },
    ]);

    const output = bookedShows.map((show) => ({
      showName: show._id.showName,
      location: show._id.location,
      theater: show._id.theater,
      date: show._id.date,
      time: show._id.time,
      totalSeatsBooked: show.totalSeatsBooked,
      seatIds: show.seatIds[0],
    }));

    res.json(output);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

showRoute
  .route("/updateshow/:id")
  .get((req, res) => {
    showSchema.findById(mongoose.Types.ObjectId(req.params.id), (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        res.json(data);
      }
    });
  })
  .put((req, res) => {
    showSchema.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      { $set: req.body },
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else {
          res.json(data);
        }
      }
    );
  });

showRoute.get("/", (req, res) => {
  showSchema.find((err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

showRoute
  .route("/profile/:id")
  .get((req, res) => {
    showSchema.findById(mongoose.Types.ObjectId(req.params.id), (err, data) => {
      if (err) return err;
      else res.json(data);
    });
  })
  .put((req, res) => {
    showSchema.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      { $set: req.body },
      (err, data) => {
        if (err) return err;
        else res.json(data);
      }
    );
  });

showRoute.delete("/deleteshow/:id", (req, res) => {
  showSchema.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id),
    (err, data) => {
      if (err) return err;
      else res.json(data);
    }
  );
});

module.exports = showRoute;
