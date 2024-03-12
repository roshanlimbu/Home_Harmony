const express = require("express");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://birenlimbu415:JVZc0AZmwXeA34Cp@cluster01.dee5ny7.mongodb.net/e-commerce",
  )
  .catch((error) => {
    console.error("An error occurred while connecting to mongodb", error);
  });

app.get("/", (req, res) => {
  res.send({ msg: "hello" });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server`);
  } else {
    console.log(`Server started at ${PORT}`);
  }
});
