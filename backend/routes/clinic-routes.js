/** @format */

const express = require("express");
const { check } = require("express-validator");

const clinicController = require("../controllers/clinic-controller");
const clinic = require("../models/clinic");

const router = express.Router();

router.post(
  "/create-clinic",
  [
    check("country").not().isEmpty(),
    check("city").not().isEmpty(),
    check("street").not().isEmpty(),
    check("block").not().isEmpty().bail().isInt(),
    check("zipCode").not().isEmpty(),
  ],
  clinicController.createClinic
);

router.post("/delete-clinic", clinicController.deleteClinic);
router.get("/get-clinic", clinicController.getClinic);
router.get("/get-all-clinics", clinicController.getAllClinics);

module.exports = router;
