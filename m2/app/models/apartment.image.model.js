const mongoose = require("mongoose");

exports.ApartmentImage = mongoose.model(
  "ApartmentImage",
  new mongoose.Schema({
    apartmentId: {type: mongoose.Types.ObjectId, ref: "Apartment"},
    image: String,
  })
);
