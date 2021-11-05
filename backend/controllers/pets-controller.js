/** @format */

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "lisa",
    surname: "johnes",
    mail: "lisajohnes@gmail.com",
    pets: {
      dogs: [
        {
          id: "d1",
          name: "bobby",
          age: "2",
          owner: "u1",
        },
      ],
      cats: [
        {
          id: "c1",
          name: "kitty",
          age: "4",
          owner: "u1",
        },
      ],
    },
  },
];

const DUMMY_PETS = [
  {
    id: "d1",
    name: "bobby",
    age: "2",
    type: "dog",
    owner: "u1",
  },
  {
    id: "c1",
    name: "kitty",
    age: "4",
    type: "cat",
    owner: "u1",
  },
  {
    id: "d2",
    name: "doggy",
    age: "3",
    type: "dog",
    owner: "u2",
  },
];

const getPetById = (req, res, next) => {
  const petId = req.params.uid;
  const pet = DOMMY_PETS.find((p) => {
    return p.uid === petId;
  });
  if (!pet) {
    throw new HttpError("Could not find a pet for the provided user id.", 404);
  }
  res.json({ pet });
};

const getPetByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const pet = DUMMY_PETS.filter((p) => {
    return p.owner === userId;
  });
  if (!pet) {
    throw new HttpError("Could not find a pet for the provided user id.", 404);
  }
  res.json({ pet });
};

const createPet = (req, res, next) => {
  const { name, age, type, owner } = req.body;

  const createdPet = {
    name,
    age,
    type,
    owner,
  };

  DUMMY_PETS.push(createdPet);

  res.status(201).json({ pet: createdPet });
};

const updatePet = (req, res, next) => {
  const { name, age } = req.body;
  const petId = req.params.uid;

  const updatePet = DUMMY_PETS.find((p) => p.id === petId);
};

const deletePet = (req, res, next) => {};

exports.getPetById = getPetById;
exports.getPetByUserId = getPetByUserId;
exports.createPet = createPet;
exports.updatePet = updatePet;
exports.deletePet = deletePet;
