/** @format */

const express = require("express");

const usersController = require("../controllers/users-controller");

const router = express.Router();

//router.get("/:uid", userController.getUserById);
router.get("/", usersController.getAllUsers);
router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.patch("/:uid");
router.delete("/:uid");

module.exports = router;
