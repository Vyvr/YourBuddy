/** @format */

const express = require("express");

const userController = require("../controllers/users-controller");

const router = express.Router();

//router.get("/:uid", userController.getUserById);
router.get("/", userController.getAllUsers);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.patch("/:uid");
router.delete("/:uid");

module.exports = router;
