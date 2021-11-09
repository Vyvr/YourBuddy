/** @format */

const express = require("express");

const usersController = require("../controllers/users-controller");
const { check } = require("express-validator");

const router = express.Router();

//router.get("/:uid", userController.getUserById);
router.get("/", usersController.getAllUsers);
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
router.post("/login", usersController.login);
router.patch("/:uid");
router.delete("/:uid");

module.exports = router;
