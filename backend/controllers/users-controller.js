/** @format */

const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const { v4: uuid } = require("uuid");

const HttpError = require("../models/http-error");
const User = require("../models/user");

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
      // new HttpError("Invalid inputs passed, please check your data", 422)
      new HttpError(JSON.stringify(errors), 422)
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
    const error = HttpError("Failed to create user.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
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

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Invalid credentials specified. Could not log in",
      401
    );
    return next(error);
  }

  res.json({ message: "Logged in!" });
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;

//exports.getUserById = getUserById;

// const getUserById = (req, res, next) => {
//   const userId = req.body;
//   console.log(userId);
//   if (!user) {
//     throw new HttpError("Could not find a user for the provided id.", 404);
//   }
//   res.json({ user: user });
// };

// exports.createUser = createUser;

// const createUser = async (req, res, next) => {
//   const { name, surname, mail, password } = req.body;
//   const newUser = new User({
//     name,
//     surname,
//     mail,
//     password,
//   });
//   const result = await newUser.save();

//   res.status(201).json(result);
// };
