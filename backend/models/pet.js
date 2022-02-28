/** @format */

const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: {
    month: { type: Number, required: false },
    year: { type: Number, required: false },
  },
  born: { type: Date, required: true },
  family: { type: String, required: false },
  weight: { type: Number, required: true },
  breed: { type: String, required: true },
  sex: { type: String, required: true },
  vaccinations: [
    {
      name: { type: String, requred: false },
      visit: { type: mongoose.Types.ObjectId, required: true, ref: "Visit" },
      term: { type: String, required: true },
      doctor: { type: String, required: true },
      doctorId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    },
  ],
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Pet", petSchema);
