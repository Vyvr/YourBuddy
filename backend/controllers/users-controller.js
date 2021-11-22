/** @format */

const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const { v4: uuid } = require("uuid");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const Pet = require("../models/pet");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError(
      "Failed to get all users. Try again later",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }
  const { name, surname, mail, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ mail: mail });
  } catch (err) {
    const error = new HttpError("Signup failed. Please try again later", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User with this email address already exists.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    id: uuid(),
    name,
    surname,
    mail,
    password,
    pets: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Failed to create user: " + err, 500);
    return next(error);
  }

  res.status(200).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { mail, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ mail: mail });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed. Please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials specified. Could not log in...",
      401
    );
    return next(error);
  }

  const matchPassword = await existingUser.comparePassword(password);

  if (!matchPassword) {
    const error = new HttpError(
      "Invalid credentials specified. Could not log in(password)",
      401
    );
    return next(error);
  }

  res.cookie("test", true, { maxAge: 900000, httpOnly: false, secure: false });

  res.json({ existingUser }).send();
};

const deleteUser = async (req, res, next) => {
  const { id } = req.body;

  let user;
  let userPets;

  try {
    user = User.findOne({ _id: id });
  } catch (err) {
    const error = new HttpError("Finding user error", 500);
    return next(error);
  }

  try {
    userPets = await User.findById(id).populate("pets");
  } catch (err) {
    const error = new HttpError("Finding user pets error", 500);
    return next(error);
  }

  try {
    await Pet.deleteMany({ id: { $in: userPets.pets.id } });
  } catch (err) {
    const error = new HttpError("Deleting pets error", 500);
    return next(error);
  }

  try {
    await User.findByIdAndDelete({ _id: id });
  } catch (err) {
    const error = new HttpError("Failed to delete user", 500);
    return next(error);
  }

  res.json({ message: "Deleted!", id });
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
exports.deleteUser = deleteUser;
