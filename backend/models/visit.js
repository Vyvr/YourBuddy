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
    required: false,
    min: 0,
    max: 23,
  },
  minutes: {
    type: Number,
    required: false,
    min: 0,
    max: 59,
  },
  vet: { type: String, required: true },
  patient: { type: String, required: true },
  patient_owner: { type: String, required: true },
  description: { type: String, required: false },
  vetName: { type: String, required: true },
  clinic: { type: String, required: true },
  patientName: { type: String, required: true },
  ownerName: { type: String, required: true },
  drugs: [{ type: String, required: false }],
  submitted: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("Visit", visitSchema);
