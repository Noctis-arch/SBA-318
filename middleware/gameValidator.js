function gameValidator(req, res, next) {
  const { title, genre, platform } = req.body;

  if (!title || !genre || !platform) {
    return res.status(400).json({
      error: "Title, genre, and platform are required."
    });
  }

  next();
}

module.exports = gameValidator;