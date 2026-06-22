const express = require("express");

const app = express();

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const gamesRoute = require("./routes/games");
const usersRoute = require("./routes/users");
const reviewsRoute = require("./routes/reviews");

const games = require("./data/games");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(logger);


app.get("/", (req, res) => {
  res.render("index");
});


app.get("/games-view", (req, res) => {
  res.render("games", {
    games
  });
});


app.use("/games", gamesRoute);
app.use("/users", usersRoute);
app.use("/reviews", reviewsRoute);


app.use(errorHandler);


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});