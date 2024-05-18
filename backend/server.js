const express = require("express");
require("dotenv").config();
const cors = require("cors");
const productRouter = require("./route/product_route.js");
const popularRouter = require("./route/popular_route.js");
const loginController = require("./controller/login_controller.js");
const signupController = require("./controller/signup_controller.js");
const { newCollection } = require("./controller/newCollection_controller.js");
// const cartItemRouter = require("./route/cart_route.js");
const {
  addtocart,
  removefromcart,
  getcart,
  fetchUser,
} = require("./controller/cart_controller.js");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    msg: "hello",
  });
});
app.use((req, res, next) => {
  console.log("Request body:", req.body);
  next();
});

app.use("/products", productRouter);
app.use("/popular", popularRouter);
app.get("/newcollection", newCollection);

// app.use("/", cartItemRouter);

app.post("/addtocart", fetchUser, addtocart);
app.get("/getcart", fetchUser, getcart);
app.post("/removefromcart", fetchUser, removefromcart);

// for uploading photos to the server
app.use("/uploads/", express.static("upload"));
app.post("/login", loginController.login);
app.post("/signup", signupController.signup);

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server`);
  } else {
    console.log(`Server started at ${PORT}`);
  }
});
