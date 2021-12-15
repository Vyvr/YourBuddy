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
    clinics: [],
    type: ["user"],
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
  // const loggedIn = req.cookies.loggedIn;

  // if (loggedIn === "true") {
  //   const loggedMail = req.cookies.mail;

  //   let loggedInUser;

  //   try {
  //     loggedInUser = await User.findOne({ mail: loggedMail });
  //   } catch (err) {
  //     const error = new HttpError(
  //       "Logging in failed. Please try again later.",
  //       500
  //     );
  //     return next(error);
  //   }

  //   const loggedInPassword = req.cookies.password;
  //   const loggedInmatchPassword = await loggedInUser.comparePassword(
  //     loggedInPassword
  //   );

  //   const newPassword = cryptr.decrypt(loggedInPassword);
  //   console.log(newPassword);
  //   // console.log(loggedInUser.password);

  //   if (!loggedInmatchPassword) {
  //     const error = new HttpError(
  //       "Invalid credentials specified. Could not log in(password)",
  //       401
  //     );
  //     return next(error);
  //   }
  //   return;
  // }
  //---------------------------------------------------------------------
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

  res.cookie("userMail", existingUser.mail, {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

  res.cookie("userPassword", existingUser.password, {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

  res.cookie("userId", existingUser.id, {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

  res.cookie("userName", existingUser.name, {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

  res.cookie("userSurname", existingUser.surname, {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

  res.cookie("userLoggedIn", true, {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

  res.cookie("loggedInAs", "user", {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

  res.cookie("user_id", existingUser._id.toString(), {
    maxAge: 900000,
    httpOnly: false,
    secure: true,
  });

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

const findUserById = async (req, res, next) => {
  const uid = req.params.uid;
  let existingUser;
  try {
    existingUser = await User.findOne({ id: uid });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed. Please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials specified. Could not find user.",
      401
    );
    return next(error);
  }

  res.json({ existingUser }).send();
};

const getUserTypes = async (req, res, next) => {
  const uid = req.params.uid;
  let existingUser;
  try {
    existingUser = await User.findById(uid);
  } catch (err) {
    const error = new HttpError(
      "Can't find user. Please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Invalid uid specified.", 401);
    return next(error);
  }

  res.json(existingUser.type).send();
};

const findUserPetsByUserId = async (req, res, next) => {
  const uid = req.params.uid;
  try {
    userPets = await User.findOne({ id: uid }).populate("pets");
  } catch (err) {
    const error = new HttpError(
      "Fetching pets failes, please try again later" + err,
      500
    );
    return next(error);
  }
  res.json({
    pets: userPets.pets.map((pet) => pet.toObject({ getters: true })),
  });
};

const editUserCredentials = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid data passed in editing user. Please check your data",
      422
    );

    return next(error);
  }

  const { id, name, surname, mail, password } = req.body;

  const userId = id;

  let updatedUser;

  try {
    updatedUser = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Finding user to edit failed. Please try again later.",
      500
    );
    return next(error);
  }

  updatedUser.name = name;
  updatedUser.surname = surname;
  updatedUser.mail = mail;
  updatedUser.password = password;

  try {
    await updatedUser.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong with saving updated user to database",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: updatedUser.toObject({ getters: true }) });
};

const addUserVetType = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid data passed in editing user's type. Please check your data",
      422
    );

    return next(error);
  }

  const { id } = req.body;

  const userId = id;

  let updatedUser;

  try {
    updatedUser = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Finding user to edit type failed. Please try again later.",
      500
    );
    return next(error);
  }

  if (updatedUser.type.length !== 2) updatedUser.type.push("vet");

  try {
    await updatedUser.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong with saving updated user type to database",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: updatedUser.toObject({ getters: true }) });
};

const getVets = async (req, res, next) => {
  let existingVets;
  try {
    existingVets = await User.find({ type: "vet" });
  } catch (err) {
    const error = new HttpError(
      "Can't find vets. Please try again later.",
      500
    );
    return next(error);
  }

  if (!existingVets) {
    const error = new HttpError("Something went wrong.", 401);
    return next(error);
  }

  res.json({
    existingVets: existingVets.map((vet) => vet.toObject({ getters: true })),
  });
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
exports.deleteUser = deleteUser;
exports.findUserById = findUserById;
exports.findUserPetsByUserId = findUserPetsByUserId;
exports.editUserCredentials = editUserCredentials;
exports.addUserVetType = addUserVetType;
exports.getUserTypes = getUserTypes;
exports.getVets = getVets;
