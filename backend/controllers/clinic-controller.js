/** @format */

const mongoose = require("mongoose");
const Geocoder = require("node-geocoder");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Vet = require("../models/vet");
const Clinic = require("../models/clinic");

const createClinic = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid data passed in creating clinic. Please check your data",
      422
    );
    return next(error);
  }

  const {
    name,
    owner,
    country,
    city,
    street,
    block,
    apartment,
    zipCode,
    fromHour,
    fromMinutes,
    toHour,
    toMinutes,
  } = req.body;

  const createdClinic = new Clinic({
    name,
    owner,
    from: {
      hour: fromHour,
      minutes: fromMinutes,
    },
    to: {
      hour: toHour,
      minutes: toMinutes,
    },
    address: {
      country,
      city,
      street,
      block,
      apartment,
      zipCode,
      lat: 0,
      lon: 0,
    },
  });

  let vet;

  try {
    vet = await Vet.findOne({ _id: owner });
  } catch (err) {
    const error = new HttpError(
      "Creating new clinic failed. Please try again later.",
      500
    );
    return next(error);
  }

  if (!vet) {
    const error = new HttpError("No vet found with provided id.", 404);
    return next(error);
  }

  try {
    const options = {
      provider: "google",
      apiKey: "AIzaSyDwWIsHgxjgAGmtL9sZ0WSNKaxf_hQ8D9U",
    };
    const geocoder = Geocoder(options);
    const locationInfo = await geocoder.geocode(
      country +
        " " +
        city +
        " " +
        street +
        " " +
        block +
        " " +
        apartment +
        " " +
        zipCode
    );

    createdClinic.address.lat = locationInfo[0].latitude;
    createdClinic.address.lon = locationInfo[0].longitude;
  } catch (err) {
    const error = new HttpError(
      "Finding lat and lon failed. Please try again later.",
      500
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    await createdClinic.save({ session: sess });

    vet.clinics.push(createdClinic);
    await vet.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating clinic failed. Please try again later." + err,
      500
    );
    return next(error);
  }

  res.status(201).json({ clinic: createdClinic });
};

const deleteClinic = async (req, res, next) => {
  const { id } = req.body;

  try {
    await Clinic.findByIdAndDelete({ _id: id });
  } catch (err) {
    const error = new HttpError("Failed to delete clinic", 500);
    return next(error);
  }

  res.json({ message: "Clinic deleted!", id });
};

const getClinic = async (req, res, next) => {};

const getAllClinics = async (req, res, next) => {};

exports.createClinic = createClinic;
exports.deleteClinic = deleteClinic;
exports.getClinic = getClinic;
exports.getAllClinics = getAllClinics;
