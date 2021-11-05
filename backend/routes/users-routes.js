/** @format */

const express = require("express");

const petsController = require("../controllers/pets-controller");
const userController = require("../controllers/users-controller");

const router = express.Router();

router.get("/:uid", userController.getUserById);

router.get("/pets/:uid", petsController.getPetByUserId);

router.post("/", petsController.createPet);

router.patch("/:uid", petsController.updatePet);

router.delete("/:uid", petsController.deletePet);

module.exports = router;
