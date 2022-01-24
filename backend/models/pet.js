/** @format */

const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  family: { type: String, required: false },
  weight: { type: Number, required: true },
  vaccinations: [{type: String, date: Date,requred: false}] ,
  owner: { type: String, required: true, ref: "User" },
});

module.exports = mongoose.model("Pet", petSchema);
