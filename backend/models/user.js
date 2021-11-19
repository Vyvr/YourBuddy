/** @format */

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  pets: [{ type: mongoose.Types.ObjectId, required: true, ref: "Pet" }],
});

module.exports = mongoose.model("User", userSchema);
