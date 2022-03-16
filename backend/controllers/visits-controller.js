/** @format */

const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const { v4: uuid } = require("uuid");
const moment = require("moment");

const HttpError = require("../models/http-error");
const Visit = require("../models/visit");
const Clinic = require("../models/clinic");
const User = require("../models/user");
const Pet = require("../models/pet");

const createVisit = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const {
    term,
    vetId,
    patientId,
    patientOwnerId,
    description,
    hour,
    clinicId,
    clinicName,
  } = req.body;

  let existingUser;
  let existingVet;
  let existingPet;
  let existingClinic;

  try {
    existingClinic = await Clinic.findById(clinicId);
  } catch (err) {
    const error = new HttpError(
      "Searching clinic failed. Please try again later",
      500
    );
    return next(error);
  }
  if (!existingClinic) {
    const error = new HttpError("No clinic found with provided id.", 404);
    return next(error);
  }

  try {
    existingUser = await User.findById(patientOwnerId);
  } catch (err) {
    const error = new HttpError(
      "Searching user failed. Please try again later",
      500
    );
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError("No user found with provided id.", 404);
    return next(error);
  }

  try {
    existingVet = await User.findById(vetId);
  } catch (err) {
    const error = new HttpError(
      "Searching vet failed. Please try again later",
      500
    );
    return next(error);
  }
  if (!existingVet || !existingVet.type.includes("vet")) {
    const error = new HttpError("No vet findound with provided id.", 404);
    return next(error);
  }

  if (!existingUser.pets.includes(patientId)) {
    const error = new HttpError("Pet id doesn't match with owner id", 404);
    return next(error);
  }

  try {
    existingPet = await Pet.findById(patientId);
  } catch (err) {
    const error = new HttpError(
      "Searching patient failed. Please try again later",
      500
    );
    return next(error);
  }
  if (!existingPet) {
    const error = new HttpError("No patient found with provided id.", 404);
    return next(error);
  }

  const vetName = existingVet.name + " " + existingVet.surname;
  const ownerName = existingUser.name + " " + existingUser.surname;
  const patientName = existingPet.name;

  const createdVisit = new Visit({
    term,
    hour,
    vet: vetId,
    clinicId: clinicId,
    clinicName,
    patient: patientId,
    patient_owner: patientOwnerId,
    description,
    vetName,
    patientName,
    ownerName,
    status: "pending",
  });

  try {
    await createdVisit.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Failed to create visit: " + err, 500);
    return next(error);
  }

  res.status(200).json({ visit: createdVisit.toObject({ getters: true }) });
};

const getVisitDetails = async (req, res, next) => {
  const visitId = req.params.id;

  try {
    existingVisit = await Visit.findById(visitId);
  } catch (err) {
    const error = new HttpError(
      "Searching visit failed. Please try again later",
      500
    );
    return next(error);
  }
  if (!existingVisit) {
    const error = new HttpError("No visit found with provided id.", 404);
    return next(error);
  }

  res.status(200).json({ visit: existingVisit.toObject({ getters: true }) });
};

const getPatientVisits = async (req, res, next) => {
  const petId = req.params.pid;

  let existingPet;

  try {
    existingPet = await Pet.findById(petId);
  } catch (err) {
    const error = new HttpError(
      "Searching patient failed. Please try again later",
      500
    );
    return next(error);
  }
  if (!existingPet) {
    const error = new HttpError("No patient found with provided id.", 404);
    return next(error);
  }

  let visitsList;
  try {
    visitsList = await Visit.find({ patient: petId }).lean();
  } catch (err) {
    const error = new HttpError(
      "Searching patient's visits failed. Please try again later",
      500
    );
    return next(error);
  }

  for (let visit of visitsList) {
    const date = new Date(visit.term);
    const momentDate = moment(date.toISOString()).format("DD/MM/YYYY", true);
    visit.term = momentDate;
  }
  res.status(200).json({
    visits: visitsList,
  });
};

const getVetVisits = async (req, res, next) => {
  const vetId = req.params.vetId;

  let existingVet;

  try {
    existingVet = await User.findById(vetId);
  } catch (err) {
    const error = new HttpError(
      "Searching vet failed. Please try again later",
      500
    );
    return next(error);
  }
  if (!existingVet) {
    const error = new HttpError("No vet found with provided id.", 404);
    return next(error);
  }

  let vetVisits;
  try {
    vetVisits = await Visit.find({ vet: vetId }).lean();
  } catch (err) {
    const error = new HttpError(
      "Searching vet's visits failed. Please try again later",
      500
    );
    return next(error);
  }

  for (let visit of vetVisits) {
    const date = new Date(visit.term);
    const momentDate = moment(date.toISOString()).format("DD/MM/YYYY", true);
    visit.term = momentDate;
  }
  res.status(200).json({
    visits: vetVisits,
  });
};

const getVetVisitsByOwner = async (req, res, next) => {
  const vetId = req.params.vetId;
  const ownerName = req.params.ownerName;

  let existingVet;

  try {
    existingVet = await User.findById(vetId);
  } catch (err) {
    const error = new HttpError(
      "Searching vet failed. Please try again later",
      500
    );
    return next(error);
  }
  if (!existingVet) {
    const error = new HttpError("No vet found with provided id.", 404);
    return next(error);
  }

  let owner = ownerName.replace("-", " ");

  let vetVisits;
  try {
    vetVisits = await Visit.find({
      vet: vetId,
      ownerName: { $regex: new RegExp(owner, "i") },
    }).lean();
  } catch (err) {
    const error = new HttpError(
      "Searching vet's visits failed. Please try again later",
      500
    );
    console.log(err);
    return next(error);
  }

  for (let visit of vetVisits) {
    const date = new Date(visit.term);
    const momentDate = moment(date.toISOString()).format("DD/MM/YYYY", true);
    visit.term = momentDate;
  }
  res.status(200).json({
    visits: vetVisits,
  });
};

const getVetVisitsByPatient = async (req, res, next) => {
  const vetId = req.params.vetId;
  const patientName = req.params.patientName;

  let existingVet;

  try {
    existingVet = await User.findById(vetId);
  } catch (err) {
    const error = new HttpError(
      "Searching vet failed. Please try again later",
      500
    );
    return next(error);
  }
  if (!existingVet) {
    const error = new HttpError("No vet found with provided id.", 404);
    return next(error);
  }

  let patient = patientName.replace("-", " ");

  let vetVisits;
  try {
    vetVisits = await Visit.find({
      vet: vetId,
      patientName: { $regex: new RegExp(patient, "i") },
    }).lean();
  } catch (err) {
    const error = new HttpError(
      "Searching vet's visits failed. Please try again later",
      500
    );
    console.log(err);
    return next(error);
  }

  for (let visit of vetVisits) {
    const date = new Date(visit.term);
    const momentDate = moment(date.toISOString()).format("DD/MM/YYYY", true);
    visit.term = momentDate;
  }
  res.status(200).json({
    visits: vetVisits,
  });
};

const getVetVisitsByClinic = async (req, res, next) => {
  const vetId = req.params.vetId;
  const clinicName = req.params.clinicName;

  let existingVet;

  try {
    existingVet = await User.findById(vetId);
  } catch (err) {
    const error = new HttpError(
      "Searching vet failed. Please try again later",
      500
    );
    return next(error);
  }
  if (!existingVet) {
    const error = new HttpError("No vet found with provided id.", 404);
    return next(error);
  }

  let clinic = clinicName.replace("-", " ");

  let vetVisits;
  try {
    vetVisits = await Visit.find({
      vet: vetId,
      clinicName: { $regex: new RegExp(clinic, "i") },
    }).lean();
  } catch (err) {
    const error = new HttpError(
      "Searching vet's visits failed. Please try again later",
      500
    );
    console.log(err);
    return next(error);
  }

  for (let visit of vetVisits) {
    const date = new Date(visit.term);
    const momentDate = moment(date.toISOString()).format("DD/MM/YYYY", true);
    visit.term = momentDate;
  }
  res.status(200).json({
    visits: vetVisits,
  });
};

const getVetVisitsByDate = async (req, res, next) => {
  const vetId = req.params.vetId;
  const date = req.params.date;

  let existingVet;

  try {
    existingVet = await User.findById(vetId);
  } catch (err) {
    const error = new HttpError(
      "Searching vet failed. Please try again later",
      500
    );
    return next(error);
  }
  if (!existingVet) {
    const error = new HttpError("No vet found with provided id.", 404);
    return next(error);
  }

  const termDate = new Date(date);

  let vetVisits;
  try {
    vetVisits = await Visit.find({
      vet: vetId,
      term: termDate,
    }).lean();
  } catch (err) {
    const error = new HttpError(
      "Searching vet's visits failed. Please try again later",
      500
    );
    console.log(err);
    return next(error);
  }

  for (let visit of vetVisits) {
    const date = new Date(visit.term);
    const momentDate = moment(date.toISOString()).format("DD/MM/YYYY", true);
    visit.term = momentDate;
  }
  res.status(200).json({
    visits: vetVisits,
  });
};

const getUnsubmittedVetVisits = async (req, res, next) => {
  const vetId = req.params.vetId;

  let existingVet;

  try {
    existingVet = await User.findById(vetId);
  } catch (err) {
    const error = new HttpError(
      "Searching vet failed. Please try again later",
      500
    );
    return next(error);
  }
  if (!existingVet) {
    const error = new HttpError("No vet found with provided id.", 404);
    return next(error);
  }

  let vetVisits;
  try {
    vetVisits = await Visit.find({ vet: vetId }).lean();
  } catch (err) {
    const error = new HttpError(
      "Searching vet's visits failed. Please try again later",
      500
    );
    return next(error);
  }

  let index = 0;
  vetVisits = vetVisits.filter((visit) => {
    return visit.submitted === false;
  });

  for (let visit of vetVisits) {
    const date = new Date(visit.term);
    //date.toString();
    const momentDate = moment(date.toISOString()).format("DD/MM/YYYY", true);
    visit.term = momentDate;
  }
  res.status(200).json({
    visits: vetVisits,
  });
};

const editVisit = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { visitId, drugList, description } = req.body;

  let existingVisit;

  try {
    existingVisit = await Visit.findById(visitId);
  } catch (err) {
    const error = new HttpError(
      "Searching visit failed. Please try again later",
      500
    );
    return next(error);
  }
  if (!existingVisit) {
    const error = new HttpError("No visit found with provided id.", 404);
    return next(error);
  }

  drugList.forEach((d) => {
    if (!existingVisit.drugs.includes(d)) existingVisit.drugs.push(d);
  });

  let existingDrugs = [...existingVisit.drugs];

  existingDrugs.forEach((d) => {
    if (!drugList.includes(d)) {
      const index = existingVisit.drugs.indexOf(d);
      existingVisit.drugs.splice(index, 1);
    }
  });

  existingVisit.description = description;
  existingVisit.submitted = true;
  existingVisit.status = "submitted";

  try {
    await existingVisit.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong with saving updated visit to database",
      500
    );
    return next(error);
  }

  res.status(200).json({ visit: existingVisit.toObject({ getters: true }) });
};

const changeStatus = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { newStatus, visitId, hour } = req.body;

  let existingVisit;

  try {
    existingVisit = await Visit.findById(visitId);
  } catch (err) {
    const error = new HttpError(
      "Searching visit failed. Please try again later",
      500
    );
    return next(error);
  }
  if (!existingVisit) {
    const error = new HttpError("No visit found with provided id.", 404);
    return next(error);
  }

  existingVisit.status = newStatus;

  if (newStatus === "canceled") existingVisit.submitted = true;
  if (newStatus === "proposition") existingVisit.hour = hour;

  try {
    await existingVisit.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong with saving updated visit to database",
      500
    );
    return next(error);
  }

  res.status(200).json({ visit: existingVisit.toObject({ getters: true }) });
};

exports.createVisit = createVisit;
exports.getVisitDetails = getVisitDetails;
exports.getPatientVisits = getPatientVisits;
exports.getVetVisits = getVetVisits;
exports.getVetVisitsByOwner = getVetVisitsByOwner;
exports.getVetVisitsByPatient = getVetVisitsByPatient;
exports.getVetVisitsByClinic = getVetVisitsByClinic;
exports.getVetVisitsByDate = getVetVisitsByDate;
exports.getUnsubmittedVetVisits = getUnsubmittedVetVisits;
exports.editVisit = editVisit;
exports.changeStatus = changeStatus;
