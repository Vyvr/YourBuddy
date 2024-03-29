/** @format */

const express = require("express");

const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

//router.get("/:uid", userController.getUserById);
//router.get("/cookies", usersController.checkLoginData);

router.get("/", usersController.getAllUsers);

router.get("/pets/:uid", usersController.findUserPetsByUserId);
router.get("/get-user-types/:uid", usersController.getUserTypes);
router.get("/get-vets", usersController.getVets);
router.get("/:uid", usersController.findUserById);
router.get(
  "/get-users-by-name-and-surname/:data",
  usersController.getUsersByNameAndSurname
);

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

router.post(
  "/edit-user-credentials",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("surname").not().isEmpty(),
    check("mail").not().isEmpty().bail().isEmail(),
  ],
  usersController.editUserCredentials
);

router.post("/add-user-vet-type", usersController.addUserVetType);

module.exports = router;
