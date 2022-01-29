/** @format */

const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  family: { type: String, required: false },
  weight: { type: Number, required: true },
  breed: { type: String, required: true },
  sex: { type: String, required: true },
  vaccinations: [{ type: String, requred: false }],
  owner: { type: String, required: true, ref: "User" },
});

module.exports = mongoose.model("Pet", petSchema);
