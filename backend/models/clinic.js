/** @format */

const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  address: { type: Object, required: true }, // contains country, city, street, block, apartment, zip code
  // from: { type: Object, required: true },
  // to: { type: Object, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true },
  workers: [{ type: String, required: false }],
});

module.exports = mongoose.model("Clinic", clinicSchema);
