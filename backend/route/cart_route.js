// const express = require("express");
// const router = express.Router();
// const { userModel, productModel, cartItem } = require("../model");
// const {
//   addtocart,
//   fetchUser,
//   removefromcart,
//   getcart,
// } = require("../controller/cart_controller.js");
// const { authenticateToken } = require("../middleware/auth");
//
// // Fetch all products
// router.get("/products/all-products", async (req, res) => {
//   try {
//     const products = await productModel.findAll();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });
//
// router.get("/getcart", authenticateToken, getcart);
// router.post("/removefromcart", authenticateToken, removefromcart);
// router.post("/addtocart", addtocart);
//
// module.exports = router;
