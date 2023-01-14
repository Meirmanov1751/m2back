const mongoose = require("mongoose");

exports.BuildingImage = mongoose.model(
  "BuildingImage",
  new mongoose.Schema({
    buildingId: {type: mongoose.Types.ObjectId, ref: "Building"},
    image: String,
  })
);
