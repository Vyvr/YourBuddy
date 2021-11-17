/** @format */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const HttpError = require("./models/http-error");

const userRoutes = require("./routes/users-routes");
const petRoutes = require("./routes/pets-routes");

const databaseURL =
  "mongodb+srv://lutek:qwer44xD@yourbuddy.d2bzh.mongodb.net/YourBuddy?retryWrites=true&w=majority";

const app = express();

app.use(express.json());

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
//   })
// );

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Controll-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/pet", petRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message } || "An unknown error occurred!");
});

mongoose
  .connect(databaseURL)
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => {
    console.error("Connecting to database failed. Error: " + error);
  });

//app.listen(5000);
