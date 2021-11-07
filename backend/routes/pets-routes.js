/** @format */

const express = require("express");

const petsController = require("../controllers/pets-controller");

const router = express.Router();

//router.get("/", petsController.getAllPets);
router.post("/create", petsController.createPet);
router.get("/:uid", petsController.getPetByUserId);

module.exports = router;
