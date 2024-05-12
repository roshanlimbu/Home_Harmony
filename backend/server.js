const express = require("express");
require("dotenv").config();
const cors = require("cors");
const productRouter = require("./route/product_route.js");
const popularRouter = require("./route/popular_route.js");
const newCollectionRouter = require("./route/newCollection_route.js");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    msg: "hello",
  });
});

app.use("/products", productRouter);
app.use("/popular", popularRouter);
app.use("/newcollection", newCollectionRouter);

// for uploading photos to the server
app.use("/uploads/", express.static("upload"));

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server`);
  } else {
    console.log(`Server started at ${PORT}`);
  }
});
