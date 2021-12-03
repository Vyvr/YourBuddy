/** @format */

const express = require("express");
const { check } = require("express-validator");

const vetsController = require("../controllers/vets-controller");

const router = express.Router();

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
