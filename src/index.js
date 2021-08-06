const express = require("express");

const app = express();
const { json, urlencoded } = express;

// Middlewares
app.use(json());
app.use(urlencoded({ extended: false }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    errors: ["Internal Server Error"]
  });
});

// Routes
app.use("/api", require("./routes"));

module.exports = exports = app;
