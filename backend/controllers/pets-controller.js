/** @format */
//const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const HttpError = require("../models/http-error");
const Pet = require("../models/pet");
const User = require("../models/user");

const getPetById = async (req, res, next) => {
  const petId = req.params.uid;
  const pet = DOMMY_PETS.find((p) => {
    return p.uid === petId;
  });
  if (!pet) {
    throw new HttpError("Could not find a pet for the provided user id.", 404);
  }
  res.json({ pet });
};

const getPetsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userPets;

  try {
    userPets = await User.findOne({ id: userId }).populate("pets");
  } catch (err) {
    const error = new HttpError(
      "Fetching pets failes, please try again later" + err,
      500
    );
    return next(error);
  }

  if (!userPets || userPets.pets.length === 0) {
    return undefined;
  }
  res.json({
    pets: userPets.pets.map((pet) => pet.toObject({ getters: true })),
  });
};

const createPet = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid data passed. Please check your data",
      422
    );
    return next(error);
  }
  const { name, age, weight, owner } = req.body;

  const createdPet = new Pet({
    name,
    age,
    weight,
    owner,
  });

  let user;

  try {
    user = await User.findOne({ id: owner });
  } catch (err) {
    const error = new HttpError(
      "Creating new pet failed. Please try again later.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("No user find with provided id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    await createdPet.save({ session: sess });

    user.pets.push(createdPet);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating pet failed. Please try again later." + err,
      500
    );
    return next(error);
  }

  res.status(201).json({ pet: createdPet });
};

const editPet = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid data passed. Please check your data",
      422
    );

    return next(error);
  }

  const { id, name, age, weight } = req.body;
  const petId = id;

  let updatedPet;

  try {
    updatedPet = await Pet.findById(petId);
  } catch (err) {
    const error = new HttpError(
      "Edit pet failed. Please try again later.",
      500
    );
    return next(error);
  }

  updatedPet.name = name;
  updatedPet.age = age;
  updatedPet.weight = weight;

  try {
    await updatedPet.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong with saving pet to database",
      500
    );
    return next(error);
  }

  res.status(200).json({ pet: updatedPet.toObject({ getters: true }) });
};

const deletePet = async (req, res, next) => {
  const { id } = req.body;

  try {
    await Pet.findByIdAndDelete({ _id: id });
  } catch (err) {
    const error = new HttpError("Failed to delete pet", 500);
    return next(error);
  }

  res.json({ message: "Pet deleted!", id });
};

exports.getPetById = getPetById;
exports.getPetsByUserId = getPetsByUserId;
exports.createPet = createPet;
exports.editPet = editPet;
exports.deletePet = deletePet;
