/** @format */

const express = require("express");

const { check } = require("express-validator");

const visitsController = require("../controllers/visits-controller");

const router = express.Router();

router.get("/get-patient-visits", visitsController.getPatientVisits);
router.get("/get-visit-details", visitsController.getVisitDetails);

router.post("/create-visit", visitsController.createVisit);

module.exports = router;
