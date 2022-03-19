/** @format */

const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, required: true },
  address: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    block: { type: String, required: true },
    apartment: { type: String, required: false },
    zipCode: { type: String, required: true },
  }, // contains country, city, street, block, apartment, zip code
  open: { type: String, required: true },
  close: { type: String, required: true },
  workers: [{ type: String, required: false }],
});

module.exports = mongoose.model("Clinic", clinicSchema);
