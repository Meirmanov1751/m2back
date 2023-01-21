const mongoose = require("mongoose");

exports.Building = mongoose.model(
  "Building",
  new mongoose.Schema({
    name: String,
    address: String,
    passDate: String,
    incomePercentage: Number,
    cityId: {type: mongoose.Types.ObjectId, ref: "City"},
    totalArea: Number,
    decription: String,
  },
    { timestamps: true }
  )
);
