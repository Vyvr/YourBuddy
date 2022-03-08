/** @format */

const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/users-routes");
const vetRoutes = require("./routes/vet-routes");
const petRoutes = require("./routes/pets-routes");
const clinicRoutes = require("./routes/clinic-routes");
const visitRoutes = require("./routes/visits-routes");

const HttpError = require("./models/http-error");

const databaseURL =
  "mongodb+srv://lutek:qwer44xD@yourbuddy.d2bzh.mongodb.net/YourBuddy?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Controll-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/vet", vetRoutes);
app.use("/api/clinic", clinicRoutes);
app.use("/api/visit", visitRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
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
