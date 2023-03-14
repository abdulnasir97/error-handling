const { NODE_ENV = "development" } = process.env;
const express = require("express");
const app = express();

// Routes
app.get("/send/:message", (req, res, next) => {
  const message = req.params.message;
  if (message.length < 3) return next("Your message is too short!");
  res.send(`Your message: ${message}`);
});

// Catch-all middleware for non-existing routes
app.use((req, res, next) => {
  if (!res.headersSent) {
    res.status(404).send("An error occurred: Could not find route.");
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(500).send(`An error occurred: ${err}`);
});

module.exports = app;