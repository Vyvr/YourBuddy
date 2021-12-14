/** @format */

const mongoose = require("mongoose");
const { stringify } = require("uuid");

const visitSchema = new mongoose.Schema({
  term: {
    type: Date,
    min: Date.now() - 1 * 24 * 60 * 60 * 1000,
    required: true,
  },
  hour: {
    type: Number,
    required: true,
    min: 0,
    max: 23,
  },
  minutes: {
    type: Number,
    required: true,
    min: 0,
    max: 59,
  },
  vet: { type: String, required: true },
  patient: { type: String, required: true },
  patient_owner: { type: String, required: true },
  description: { type: String, required: false },
  vetName: { type: String, required: true },
  patientName: { type: String, required: true },
  ownerName: { type: String, required: true },
});

module.exports = mongoose.model("Visit", visitSchema);
