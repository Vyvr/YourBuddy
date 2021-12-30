/** @format */

const express = require("express");

const { check } = require("express-validator");

const visitsController = require("../controllers/visits-controller");

const router = express.Router();

router.get("/get-patient-visits/:pid", visitsController.getPatientVisits);
router.get("/get-visit-details/:id", visitsController.getVisitDetails);
router.get("/get-vet-visits/:vetId", visitsController.getVetVisits);

router.post("/create-visit", visitsController.createVisit);

module.exports = router;
