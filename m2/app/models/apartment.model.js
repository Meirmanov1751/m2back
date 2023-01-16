const mongoose = require("mongoose");

exports.Apartment = mongoose.model(
  "Apartment",
  new mongoose.Schema({
    name: String,
    area: Number,
    soldArea: Number,
    building: {type: mongoose.Types.ObjectId, ref: "Building"},
  })
);
