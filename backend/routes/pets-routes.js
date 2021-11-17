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
    check("age").not().isEmpty().bail().isInt({ min: 0 }),
    check("weight").not().isEmpty().bail().isInt({ min: 0 }),
  ],
  petsController.createPet
);
router.patch(
  "/edit",
  [
    check("name").not().isEmpty(),
    check("age").not().isEmpty().bail().isInt({ min: 0 }),
    check("weight").not().isEmpty().bail().isInt({ min: 0 }),
  ],
  petsController.editPet
);
router.get("/:uid", petsController.getPetsByUserId);

module.exports = router;
