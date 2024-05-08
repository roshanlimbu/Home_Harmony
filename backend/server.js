const express = require("express");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI).catch((error) => {
  console.error("An error occurred while connecting to mongodb", error);
});

app.get("/", (req, res) => {
  res.send({ msg: "hello" });
});

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  } else {
    res.json({
      success: 1,
      image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
    });
  }
});

// schema for db
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// api for removing the product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed.");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// creating api for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products found.");
  res.send(products);
});

// Shema creating for User Model
const Users = mongoose.model("Users", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.new,
  },
});

// Creating Endpoint for regestering the user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing user found with same email address",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({
    success: true,
    token,
  });
});

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const userVerify = req.body.password === user.password;
    if (userVerify) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "No user found with this email" });
  }
});

app.get("/newcollection", async (req, res) => {
  let products = await Product.find({});
  let newCollection = products.slice(1).slice(-8);
  console.log("New collection fetched.");
  res.send(newCollection);
});

app.get("/popular", async (req, res) => {
  let products = await Product.find({ category: "kitchenware" });
  let popular_in_kitchenware = products.slice(0, 4);
  console.log("Popular in kitchenware fetched.");
  res.send(popular_in_kitchenware);
});

// adding products
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    available: req.body.available,
  });
  console.log(product);
  await product.save();
  console.log("Product added successfully in the database.");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server`);
  } else {
    console.log(`Server started at ${PORT}`);
  }
});
