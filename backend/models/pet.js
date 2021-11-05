/** @format */

const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  owner: { type: String, required: true },
});

module.exports = mongoose.model("Pet", petSchema);
