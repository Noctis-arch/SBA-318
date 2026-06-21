const express = require("express");
const router = express.Router();

const games = require("../data/games");
const gameValidator = require("../middleware/gameValidator");


// GET all games

router.get("/", (req, res) => {
  let filteredGames = games;

  if (req.query.genre) {
    filteredGames = games.filter(
      game =>
        game.genre.toLowerCase() ===
        req.query.genre.toLowerCase()
    );
  }

  res.json(filteredGames);
});


// GET game by id

router.get("/:id", (req, res) => {
  const game = games.find(
    game => game.id === Number(req.params.id)
  );

  if (!game) {
    return res.status(404).json({
      error: "Game not found"
    });
  }

  res.json(game);
});


// POST game

router.post("/", gameValidator, (req, res) => {
  const newGame = {
    id: games.length + 1,
    title: req.body.title,
    genre: req.body.genre,
    platform: req.body.platform
  };

  games.push(newGame);

  res.status(201).json(newGame);
});


// PATCH game

router.patch("/:id", (req, res) => {
  const game = games.find(
    game => game.id === Number(req.params.id)
  );

  if (!game) {
    return res.status(404).json({
      error: "Game not found"
    });
  }

  game.title = req.body.title || game.title;
  game.genre = req.body.genre || game.genre;
  game.platform = req.body.platform || game.platform;

  res.json(game);
});


// DELETE game

router.delete("/:id", (req, res) => {
  const index = games.findIndex(
    game => game.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Game not found"
    });
  }

  games.splice(index, 1);

  res.json({
    message: "Game deleted"
  });
});

module.exports = router;