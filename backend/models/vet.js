/** @format */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const vetSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  clinics: [{ type: mongoose.Types.ObjectId, required: true, ref: "Clinic" }],
});

vetSchema.pre("save", function (next) {
  const vet = this;

  if (!vet.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(vet.password, salt, (err, hash) => {
      if (err) return next(err);

      vet.password = hash;
      next();
    });
  });
});

vetSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Vet", vetSchema);
