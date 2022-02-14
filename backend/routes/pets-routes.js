/** @format */

const express = require("express");
const { check } = require("express-validator");

const petsController = require("../controllers/pets-controller");

const router = express.Router();
//router.get("/", petsController.getAllPets);
router.post(
  "/create",
  [
    check("name").not().isEmpty(),
    check("weight").not().isEmpty().bail().isInt({ min: 0 }),
  ],
  petsController.createPet
);
router.post(
  "/edit",
  [
    check("name").not().isEmpty(),
    check("weight").not().isEmpty().bail().isInt({ min: 0 }),
  ],
  petsController.editPet
);

router.post("/add-vaccinations", petsController.updatePetVaccinations);
router.get("/:uid", petsController.getPetsByUserId);
router.get("/get-pet-data/:petId", petsController.getPetData);

module.exports = router;
