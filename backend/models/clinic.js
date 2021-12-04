/** @format */

const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  address: { type: String, required: true }, // to improve for google maps
  open: { type: String, required: true },
});

module.exports = mongoose.model("Clinic", clinicSchema);
