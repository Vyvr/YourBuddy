/** @format */

const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  family: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Pet", petSchema);
