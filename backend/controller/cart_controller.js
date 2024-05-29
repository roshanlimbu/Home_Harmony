const jwt = require("jsonwebtoken");
const db = require("../model/index");
const CartItem = db.cartItem;

// Middleware to fetch user from the token
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({
      errors: "Please authenticate.",
    });
  }

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({
      errors: "Please authenticate with a valid token.",
    });
  }
};

// Add item to cart
const addtocart = async (req, res) => {
  try {
    const { cartData } = req.body;

    if (!cartData) {
      return res.status(400).json({ errors: "Invalid request body." });
    }

    for (const productId in cartData) {
      const quantity = cartData[productId];
      // Perform your add to cart logic here
      // console.log(`Adding ${quantity} of product ${productId} to cart`);
      // console.log("user id: ", req.user.id);

      let cartItem = await CartItem.findOne({
        where: { userId: req.user.id, productId: productId },
      });

      if (cartItem) {
        cartItem.quantity += quantity; // Use the correct quantity from cartData
        await cartItem.save();
      } else {
        await CartItem.create({
          userId: req.user.id,
          productId: productId,
          quantity: quantity, // Use the correct quantity from cartData
        });
      }
    }

    res.status(200).send({ status: "Added" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get cart items
const getcart = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({
      where: { userId: req.user.id },
    });

    const cartData = {};
    cartItems.forEach((item) => {
      cartData[item.productId] = item.quantity;
    });

    res.json(cartData);
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).send({
      errors: "Error getting cart.",
    });
  }
};

// Remove item from cart
const removefromcart = async (req, res) => {
  try {
    const { itemId } = req.body; // Ensure you are extracting the itemId from req.body

    if (!itemId) {
      return res.status(400).json({ errors: "Invalid request body." });
    }

    let cartItem = await CartItem.findOne({
      where: { userId: req.user.id, productId: itemId },
    });

    if (cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        await cartItem.save();
      } else {
        await cartItem.destroy();
      }
      res.status(200).send("Removed from cart.");
    } else {
      res.status(404).send("Item not in cart.");
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).send({
      errors: "Error removing from cart.",
    });
  }
};
const updatecart = async (req, res) => {
  try {
    const { cartData, itemId, action } = req.body;

    // Validate request body
    if (!cartData || !itemId || !action) {
      console.error("Invalid request body:", req.body);
      return res.status(400).json({ errors: "Invalid request body." });
    }

    // Log the incoming request
    console.log("Incoming request:", {
      user: req.user,
      cartData,
      itemId,
      action,
    });

    // Check if user ID is set
    if (!req.user || !req.user.id) {
      console.error("User ID is not set in request.");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.id;

    // Find the cart item
    let cartItem = await CartItem.findOne({
      where: { userId, productId: itemId },
    });

    if (action === "remove") {
      if (cartItem) {
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
          await cartItem.save();
          console.log("Item quantity decreased:", cartItem);
        } else {
          await cartItem.destroy();
          console.log("Item removed from cart:", itemId);
        }
        return res.status(200).send("Removed from cart.");
      } else {
        console.error("Item not found in cart:", itemId);
        return res.status(404).send("Item not in cart.");
      }
    } else if (action === "add") {
      if (cartItem) {
        cartItem.quantity += 1;
        await cartItem.save();
        console.log("Item quantity increased:", cartItem);
      } else {
        await CartItem.create({
          userId,
          productId: itemId,
          quantity: 1,
        });
        console.log("Item added to cart:", { userId, productId: itemId });
      }
      return res.status(200).send("Added to cart.");
    } else {
      console.error("Invalid action:", action);
      return res.status(400).send("Invalid action.");
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = updatecart;

module.exports = {
  addtocart,
  updatecart,
  fetchUser,
  removefromcart,
  getcart,
};
