/** @format */

const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  term: { type: Date, required: true },
  vet: { type: String, required: true },
  patient: { type: String, required: true },
  owner: { type: String, required: true },
  description: { type: String, required: false },
});

module.exports = mongoose.model("Visit", visitSchema);
