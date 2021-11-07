/** @format */

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  pets: [{ type: mongoose.Types.ObjectId, required: true, ref: "Pet" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
