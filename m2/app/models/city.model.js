const mongoose = require("mongoose");

exports.City = mongoose.model(
  "City",
  new mongoose.Schema({
    name: String,
  })
);
