/** @format */
//const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const HttpError = require("../models/http-error");
const Pet = require("../models/pet");
const User = require("../models/user");
const Visit = require("../models/visit");

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

  userPets.pets.forEach((pet) => {
    const today = new Date();

    if (today.getMonth() < pet.born.getMonth()) {
      pet.age.month = pet.born.getMonth() - today.getMonth();
    } else {
      pet.age.month = today.getMonth() - pet.born.getMonth();
    }

    pet.age.year = today.getFullYear() - pet.born.getFullYear();
  });

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
  const { name, born, weight, owner, breed, sex } = req.body;

  let imagePath;

  if (req.file) {
    imagePath = req.file.path;
  } else {
    imagePath = "uploads/images/pet.jpg";
  }

  const createdPet = new Pet({
    name,
    born,
    weight,
    owner,
    breed,
    sex,
    image: imagePath,
  });

  console.log(createdPet);

  let user;

  try {
    user = await User.findById(owner);
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

  const { id, name, born, weight, breed } = req.body;
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
  updatedPet.born = born;
  updatedPet.weight = weight;
  updatedPet.breed = breed;

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
  const petId = id;
  let existingPet;

  try {
    existingPet = await Pet.findById(petId);
  } catch (err) {
    const error = new HttpError(
      "Searching pet failed. Please try again later.",
      500
    );
    return next(error);
  }

  try {
    await User.updateOne(
      { _id: existingPet.owner.toString() },
      { $pull: { pets: petId } }
    );
  } catch (err) {
    const error = new HttpError("Finding user error " + err, 500);
    return next(error);
  }

  try {
    await Pet.deleteOne({ _id: petId });
  } catch (err) {
    const error = new HttpError("Deleting pets error", 500);
    return next(error);
  }

  res.json({ message: "Pet deleted!", id });
};

const getPetData = async (req, res, next) => {
  const petId = req.params.petId;
  let existingPet;

  try {
    existingPet = await Pet.findById(petId);
  } catch (err) {
    const error = new HttpError(
      "Searching pet failed. Please try again later.",
      500
    );
    return next(error);
  }

  const today = new Date();

  if (today.getMonth() < existingPet.born.getMonth()) {
    existingPet.age.month = existingPet.born.getMonth() - today.getMonth();
  } else {
    existingPet.age.month = today.getMonth() - existingPet.born.getMonth();
  }

  existingPet.age.year = today.getFullYear() - existingPet.born.getFullYear();

  res.status(200).json({ existingPet });
};

const updatePetVaccinations = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { petId, visitId, vaccinations, term, vetName, vetId } = req.body;

  let existingPet;

  try {
    existingPet = await Pet.findById(petId);
  } catch (err) {
    const error = new HttpError(
      "Searching pet failed. Please try again later",
      500
    );
    return next(error);
  }
  if (!existingPet) {
    const error = new HttpError("No pet found with provided id.", 404);
    return next(error);
  }

  let objVaccinations = [];

  vaccinations.forEach((v) => {
    objVaccinations.push({
      name: v,
      visit: visitId,
      term: term,
      doctor: vetName,
      doctorId: vetId,
    });
  });

  objVaccinations.forEach((v) => {
    if (!existingPet.vaccinations.some((e) => e.name === v.name)) {
      existingPet.vaccinations.push(v);
    }
  });

  let vaccinePresent;
  let existingVaccinations = [...existingPet.vaccinations];

  existingVaccinations.forEach((v) => {
    vaccinePresent = objVaccinations.findIndex((e) => e.name === v.name);
    if (vaccinePresent === -1) {
      const index = existingPet.vaccinations.indexOf(v);
      existingPet.vaccinations.splice(index, 1);
    }
  });

  try {
    await existingPet.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong with saving updated pet to database",
      500
    );
    return next(err);
  }

  res.status(200).json({ visit: existingPet.toObject({ getters: true }) });
};

exports.getPetsByUserId = getPetsByUserId;
exports.createPet = createPet;
exports.editPet = editPet;
exports.deletePet = deletePet;
exports.getPetData = getPetData;
exports.updatePetVaccinations = updatePetVaccinations;
