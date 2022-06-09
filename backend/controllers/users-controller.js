/** @format */

const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const { v4: uuid } = require("uuid");
const fs = require("fs");

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
  res.json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 421)
    );
  }
  const { name, surname, mail, password } = req.body;

  let lowerCaseMail = mail;
  lowerCaseMail = lowerCaseMail.toLowerCase();

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
    mail: lowerCaseMail,
    password,
    pets: [],
    clinics: [],
    type: ["user"],
    image: "uploads/images/user.png",
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

  let lowerCaseMail = mail;
  lowerCaseMail = lowerCaseMail.toLowerCase();

  let existingUser;

  try {
    existingUser = await User.findOne({ mail: lowerCaseMail });
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

  let vet = false;

  if (existingUser.type.includes("vet")) vet = true;

  res.cookie("userMail", existingUser.mail, {
    httpOnly: false,
    secure: true,
  });

  res.cookie("userPassword", existingUser.password, {
    httpOnly: false,
    secure: true,
  });

  res.cookie("userId", existingUser.id, {
    httpOnly: false,
    secure: true,
  });

  res.cookie("userName", existingUser.name, {
    httpOnly: false,
    secure: true,
  });

  res.cookie("userSurname", existingUser.surname, {
    httpOnly: false,
    secure: true,
  });

  res.cookie("userLoggedIn", true, {
    httpOnly: false,
    secure: true,
  });

  res.cookie("isVet", vet, {
    httpOnly: false,
    secure: true,
  });

  res.cookie("user_id", existingUser._id.toString(), {
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
    existingUser = await User.findById(uid);
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

  res.json({ existingUser });
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

  res.json(existingUser.type);
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

  const { id, name, surname, mail, password, isVet } = req.body;

  let updatedUser;

  try {
    updatedUser = await User.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Finding user to edit failed. Please try again later.",
      500
    );
    return next(error);
  }

  let imagePath;

  if (req.file) {
    imagePath = req.file.path;
    if (updatedUser.image && updatedUser.image !== "uploads/images/user.png") {
      await fs.unlink(updatedUser.image, () => {});
    }
  }
  if (imagePath) updatedUser.image = imagePath;

  updatedUser.name = name;
  updatedUser.surname = surname;
  updatedUser.mail = mail;

  if (password) updatedUser.password = password;

  let vetBoolean;

  if (isVet === "true") {
    vetBoolean = true;
  } else {
    vetBoolean = false;
  }
  if (vetBoolean && !updatedUser.type.includes("vet")) {
    updatedUser.type.push("vet");
  } else if (!vetBoolean && updatedUser.type.includes("vet")) {
    const index = updatedUser.type.indexOf("vet");
    updatedUser.type.splice(index, 1);
  }

  try {
    await updatedUser.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong with saving updated user to database",
      500
    );
    return next(error);
  }

  res.cookie("userMail", updatedUser.mail, {
    httpOnly: false,
    secure: true,
  });

  res.cookie("userPassword", updatedUser.password, {
    httpOnly: false,
    secure: true,
  });
  res.cookie("userName", updatedUser.name, {
    httpOnly: false,
    secure: true,
  });

  res.cookie("userSurname", updatedUser.surname, {
    httpOnly: false,
    secure: true,
  });

  res.cookie("isVet", vetBoolean, {
    httpOnly: false,
    secure: true,
  });

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

const getUsersByNameAndSurname = async (req, res, next) => {
  const data = req.params.data;

  const dataArray = data.split("-");
  const name = dataArray[0];
  const surname = dataArray[1];

  const reName = new RegExp(name, "i");
  const reSurname = new RegExp(surname, "i");

  let existingUsers;
  try {
    existingUsers = await User.find({
      name: { $regex: reName },
      surname: { $regex: reSurname },
      type: "vet",
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong with finding new workers.",
      401
    );
    return next(error);
  }

  res.json({
    existingUsers: existingUsers.map((user) =>
      user.toObject({ getters: true })
    ),
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
exports.getUsersByNameAndSurname = getUsersByNameAndSurname;
