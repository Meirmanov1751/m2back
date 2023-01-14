const mongoose = require("mongoose");

exports.Apartment = mongoose.model(
  "Apartment",
  new mongoose.Schema({
    name: String,
    area: Number,
    soldArea: Number,
  })
);
