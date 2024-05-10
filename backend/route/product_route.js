const express = require("express");
const router = express.Router();
const uploadFile = require("../controller/multer/multer.js");

const productController = require("../controller/product_controller");

// Add a new product
router.post("/add-product", uploadFile, productController.addProduct);

// Remove a product
router.delete("/remove-product/:id", productController.removeProduct);

// Search for products
router.get("/search-product", productController.searchProduct);

// Show all products
router.get("/show-all-products", productController.showAllProducts);

module.exports = router;
