/** @format */

const express = require("express");
const { check } = require("express-validator");

const petsController = require("../controllers/pets-controller");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();
//router.get("/", petsController.getAllPets);
router.post(
  "/create",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("weight").not().isEmpty().bail().isInt({ min: 0 }),
  ],
  petsController.createPet
);
router.post(
  "/edit",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("weight").not().isEmpty().bail().isInt({ min: 0 }),
  ],
  petsController.editPet
);

router.post("/delete", petsController.deletePet);

router.post("/add-vaccinations", petsController.updatePetVaccinations);
router.get("/:uid", petsController.getPetsByUserId);
router.get("/get-pet-data/:petId", petsController.getPetData);

module.exports = router;
