/** @format */

const express = require("express");
const { check } = require("express-validator");
const { get } = require("mongoose");

const vetsController = require("../controllers/vets-controller");

const router = express.Router();

router.get("/get-vet", vetsController.getVet);
router.get("/", vetsController.getAllVets);
router.get("/get-vet-clinics", vetsController.getVetClinics);

router.post("/delete", vetsController.deleteVetOnly);
router.post("/delete-vet-with-clinics", vetsController.deleteVetWithClinics);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("surname").not().isEmpty(),
    check("mail").not().isEmpty().bail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  vetsController.signup
);

router.post(
  "/login",
  [
    check("mail").not().isEmpty().bail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  vetsController.login
);

module.exports = router;

//------------------------------------------------------------------
// router.get("/", usersController.getAllUsers);
// router.get("/:uid", usersController.findUserById);
// router.get("/pets/:uid", usersController.findUserPetsByUserId);
// router.post("/delete", vetsController.deleteUser);
