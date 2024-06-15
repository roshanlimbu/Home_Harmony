const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const productRouter = require("./route/product_route.js");
const popularRouter = require("./route/popular_route.js");
const signupController = require("./controller/signup_controller.js");
const { newCollection } = require("./controller/newCollection_controller.js");
const userRoutes = require("./route/user_route.js");

const {
  addtocart,
  removefromcart,
  getcart,
  fetchUser,
  updatecart,
} = require("./controller/cart_controller.js");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ msg: "hello" });
});

app.use("/products", productRouter);
app.use("/popular", popularRouter);
app.get("/newcollection", newCollection);

app.post("/addtocart", fetchUser, addtocart);
app.post("/removefromcart", fetchUser, removefromcart);
app.post("/updateCart", fetchUser, updatecart);
app.get("/getcart", fetchUser, getcart);

// For uploading photos to the server
app.use("/uploads/", express.static("upload"));

// User-related routes
app.use("/api/user", userRoutes);

// Signup route
app.post("/signup", signupController.signup);
app.use("/login", userRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server`);
  } else {
    console.log(`Server started at ${PORT}`);
  }
});
