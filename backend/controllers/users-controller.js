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

const getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_USERS.find((u) => {
    return u.id === userId;
  });

  if (!user) {
    throw new HttpError("Could not find a user for the provided id.", 404);
  }
  res.json({ user: user });
};

exports.getUserById = getUserById;
