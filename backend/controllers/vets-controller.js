/** @format */

const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const { v4: uuid } = require("uuid");

const HttpError = require("../models/http-error");
const Vet = require("../models/vet");

const getAllVets = async (req, res, next) => {
  let vets;
  try {
    vets = await Vet.find();
  } catch (err) {
    const error = new HttpError("Failed to get all vets. Try again later", 500);
    return next(error);
  }
  res.json({ vets: vets.map((vet) => vet.toObject({ getters: true })) });
};

const deleteVetOnly = async (req, res, next) => {
  const { id } = req.body;

  let vet;

  try {
    await Vet.findByIdAndDelete({ _id: id });
  } catch (err) {
    const error = new HttpError("Failed to delete vet", 500);
    return next(error);
  }

  res.json({ message: "Vet deleted!", id });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }
  const { name, surname, mail, password } = req.body;

  let existingVet;

  try {
    existingVet = await Vet.findOne({ mail: mail });
  } catch (err) {
    const error = new HttpError("Signup failed. Please try again later", 500);
    return next(error);
  }

  if (existingVet) {
    const error = new HttpError(
      "Vet with this email address already exists.",
      422
    );
    return next(error);
  }

  const createdVet = new Vet({
    id: uuid(),
    name,
    surname,
    mail,
    password,
  });

  try {
    await createdVet.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Failed to create vet: " + err, 500);
    return next(error);
  }

  res.status(200).json({ vet: createdVet.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { mail, password } = req.body;

  let existingVet;

  try {
    existingVet = await Vet.findOne({ mail: mail });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed. Please try again later.",
      500
    );
    return next(error);
  }

  if (!existingVet) {
    const error = new HttpError(
      "Invalid credentials specified. Could not log in...",
      401
    );
    return next(error);
  }

  const matchPassword = await existingVet.comparePassword(password);

  if (!matchPassword) {
    const error = new HttpError(
      "Invalid credentials specified. Could not log in(password)",
      401
    );
    return next(error);
  }

  res.cookie("vetMail", existingVet.mail, {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

  res.cookie("vetPassword", existingVet.password, {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

  res.cookie("vetId", existingVet.id, {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

  res.cookie("vetName", existingVet.name, {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

  res.cookie("vetSurname", existingVet.surname, {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

  res.cookie("vetLoggedIn", true, {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

  res.cookie("loggedInAs", "vet", {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

  res.cookie("vet_id", existingVet._id, {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

  res.json({ existingVet }).send();
};

exports.deleteVetOnly = deleteVetOnly;
exports.getAllVets = getAllVets;
exports.signup = signup;
exports.login = login;
