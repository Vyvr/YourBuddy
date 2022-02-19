/** @format */

const mongoose = require("mongoose");
const Geocoder = require("node-geocoder");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Vet = require("../models/user");
const Clinic = require("../models/clinic");

const createClinic = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
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
    open,
    close,
  } = req.body;

  const createdClinic = new Clinic({
    name,
    owner,
    open,
    close,
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
    console.log(err);
    const error = new HttpError(
      "Creating clinic failed. Please try again later." + err,
      500
    );
    return next(error);
  }

  res.status(201).json({ clinic: createdClinic });
};

const editClinic = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid data passed. Please check your data",
      422
    );

    return next(error);
  }

  const {
    id,
    name,
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

  const clinicId = id;

  let updatedClinic;

  try {
    updatedClinic = await Clinic.findById(clinicId);
  } catch (err) {
    const error = new HttpError(
      "Finding clinic to edit failed. Please try again later.",
      500
    );
    return next(error);
  }

  updatedClinic.name = name;
  updatedClinic.country = country;
  updatedClinic.city = city;
  updatedClinic.street = street;
  updatedClinic.block = block;
  updatedClinic.apartment = apartment;
  updatedClinic.zipCode = zipCode;
  updatedClinic.fromHour = fromHour;
  updatedClinic.fromMinutes = fromMinutes;
  updatedClinic.toHour = toHour;
  updatedClinic.toMinutes = toMinutes;

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

    updatedClinic.address.lat = locationInfo[0].latitude;
    updatedClinic.address.lon = locationInfo[0].longitude;
  } catch (err) {
    const error = new HttpError(
      "Finding lat and lon failed. Please try again later.",
      500
    );
    return next(error);
  }

  try {
    await updatedClinic.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong with saving updated clinic to database",
      500
    );
    return next(error);
  }

  res.status(200).json({ clinic: updatedClinic.toObject({ getters: true }) });
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

const getClinic = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid data passed. Please check your data",
      422
    );

    return next(error);
  }

  const { id } = req.body;
  const clinicId = id;

  let clinic;

  try {
    clinic = await Clinic.findById(clinicId);
  } catch (err) {
    const error = new HttpError(
      "Finding clinic failed. Please try again later.",
      500
    );
    return next(error);
  }

  res.json({ clinic }).send();
};

const getAllVetClinicsByVetId = async (req, res, next) => {
  const uid = req.params.uid;
  try {
    vetClinics = await Vet.findById(uid).populate("clinics");
  } catch (err) {
    const error = new HttpError(
      "Fetching clinics failed, please try again later" + err,
      500
    );
    return next(error);
  }
  res.json({
    clinics: vetClinics.clinics.map((clinic) =>
      clinic.toObject({ getters: true })
    ),
  });
};

const getAllClinics = async (req, res, next) => {
  let clinics;
  try {
    clinics = await Clinic.find();
  } catch (err) {
    const error = new HttpError(
      "Failed to get all clinics. Try again later",
      500
    );
    return next(error);
  }
  res.json({
    clinics: clinics.map((clinic) => clinic.toObject({ getters: true })),
  });
};

const addWorker = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid data passed. Please check your data",
      422
    );

    return next(error);
  }

  const { uid, cid } = req.body;
  const workerId = uid;
  const clinicId = cid;

  let worker;
  let clinic;

  try {
    worker = await Vet.findById(workerId);
  } catch (err) {
    const error = new HttpError("Finding worker error", 500);
    return next(error);
  }

  if (!worker === undefined) {
    const error = new HttpError("No worker found with proided id", 401);
    return next(error);
  }

  try {
    clinic = await Clinic.findById(clinicId);
  } catch (err) {
    const error = new HttpError("Finding clinic error", 500);
    return next(error);
  }

  if (!clinic) {
    const error = new HttpError("No clinic found with proided id", 401);
    return next(error);
  }

  clinic.workers.push(worker._id);

  try {
    await clinic.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong with saving updated clinic type to database",
      500
    );
    return next(error);
  }

  res.status(201).json({ message: "Added worker to clinic successfully." });
};

const dismissWorker = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid data passed. Please check your data",
      422
    );

    return next(error);
  }

  const { uid, cid } = req.body;
  const workerId = uid;
  const clinicId = cid;

  let clinic;

  try {
    clinic = await Clinic.findById(clinicId);
  } catch (err) {
    const error = new HttpError("Finding clinic error", 500);
    return next(error);
  }

  if (!clinic) {
    const error = new HttpError("No clinic found with proided id", 401);
    return next(error);
  }

  try {
    await Clinic.updateOne({ _id: clinicId }, { $pull: { workers: workerId } });
  } catch (err) {
    const error = new HttpError("Finding user error " + err, 500);
    return next(error);
  }

  res.status(201).json({ message: "Worker dismissed successfully." });
};

const getAllClinicVets = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid data passed. Please check your data",
      422
    );

    return next(error);
  }

  const clinicId = req.params.cid;

  let clinic;

  try {
    clinic = await Clinic.findById(clinicId);
  } catch (err) {
    const error = new HttpError("Finding clinic error", 500);
    return next(error);
  }

  if (!clinic) {
    const error = new HttpError("No clinic found with proided id", 401);
    return next(error);
  }

  let workersList = [];
  for (const worker of clinic.workers) {
    let vet;
    try {
      vet = await Vet.findById(worker);
      workersList.push(vet);
    } catch (err) {
      const error = new HttpError("Finding worker error", 500);
      next(error);
    }
  }

  res.json({
    workers: workersList.map((worker) => worker.toObject({ getters: true })),
  });
};

exports.createClinic = createClinic;
exports.editClinic = editClinic;
exports.deleteClinic = deleteClinic;
exports.getClinic = getClinic;
exports.getAllVetClinicsByVetId = getAllVetClinicsByVetId;
exports.getAllClinics = getAllClinics;
exports.addWorker = addWorker;
exports.dismissWorker = dismissWorker;
exports.getAllClinicVets = getAllClinicVets;
