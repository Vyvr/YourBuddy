/** @format */

const mongoose = require("mongoose");
const {validationResult} = require("express-validator");
const {v4: uuid} = require("uuid");

const HttpError = require("../models/http-error");
const Visit = require("../models/visit");
const Clinic = require("../models/clinic")
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
        minutes,
        clinicId,
    } = req.body;

    let existingUser;
    let existingVet;
    let existingPet;
    let existingClinic;

    console.log(clinicId);

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
        minutes,
        vet: vetId,
        clinic: clinicId,
        patient: patientId,
        patient_owner: patientOwnerId,
        description,
        vetName,
        patientName,
        ownerName,
    });

    try {
        await createdVisit.save();
    } catch (err) {
        console.log(err);
        const error = new HttpError("Failed to create visit: " + err, 500);
        return next(error);
    }

    res.status(200).json({visit: createdVisit.toObject({getters: true})});
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

    res.status(200).json({visit: existingVisit.toObject({getters: true})});
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
        visitsList = await Visit.find({patient: petId});
    } catch (err) {
        const error = new HttpError(
            "Searching patient's visits failed. Please try again later",
            500
        );
        return next(error);
    }

    res.status(200).json({visits: visitsList.map((visit) => visit.toObject({getters: true}))});
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
        vetVisits = await Visit.find({vet: vetId});
    } catch (err) {
        const error = new HttpError(
            "Searching vet's visits failed. Please try again later",
            500
        );
        return next(error);
    }

    res.status(200).json({
        visits: vetVisits.map((visit) => visit.toObject({getters: true})),
    });
};

exports.createVisit = createVisit;
exports.getVisitDetails = getVisitDetails;
exports.getPatientVisits = getPatientVisits;
exports.getVetVisits = getVetVisits;
