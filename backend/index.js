var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const movieRouter = require("./Routes/movieRoute");
const userRouter = require("./Routes/userRoute");
const showRouter = require("./Routes/showRoute");
const theatreRouter = require("./Routes/theatreRoute");
const feedbackRoute = require("./Routes/feedbackRoute");
const adminRoute = require("./Routes/adminRoute");
var mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://mernproject:mernproject@gopilakshman.p48fsti.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
var db = mongoose.connection;
db.on("open", () => console.log("Connected to DB"));
db.on("error", () => console.log("Error occurred"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/movies", movieRouter);
app.use("/users", userRouter);
app.use("/shows", showRouter);
app.use("/theatres", theatreRouter);
app.use("/feedbacks", feedbackRoute);
app.use("/admins", adminRoute);

app.listen(4000, () => {
  console.log("Server started at 4000");
});
