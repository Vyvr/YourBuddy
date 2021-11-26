/** @format */

const express = require("express");

const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

const router = express.Router();

//router.get("/:uid", userController.getUserById);
//router.get("/cookies", usersController.checkLoginData);

router.get("/", usersController.getAllUsers);
router.get("/:uid", usersController.findUserById);
router.get("/pets/:uid", usersController.findUserPetsByUserId);
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("surname").not().isEmpty(),
    check("mail").not().isEmpty().bail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);
router.post(
  "/login",
  [
    check("mail").not().isEmpty().bail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.login
);

router.post("/delete", usersController.deleteUser);

module.exports = router;
