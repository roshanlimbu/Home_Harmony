const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../model/index");
const Users = db.users;
const CartItems = db.cartItem;
const Products = db.product;

async function login(req, res) {
  let user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    const userVerify = await bcrypt.compare(
      req.body.password.toString(),
      user.password,
    );
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
      res.json({
        success: false,
        errors: "Wrong Password",
      });
    }
  } else {
    res.json({
      success: false,
      errors: "No user found with this email",
    });
  }
}

async function getUserDetails(req, res) {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
      include: [
        {
          model: CartItems,
          as: 'cartItems',
          attributes: ['id', 'quantity'],
          include: [
            {
              model: Products,
              as: 'product',
              attributes: ['id', 'name', 'new_price'],
            },
          ],
        },
      ],
    });

    if (user) {
      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          cartItems: user.cartItems,
        },
      });
    } else {
      res.json({
        success: false,
        errors: "User not found",
      });
    }
  } catch (error) {
    console.error("Error getting user details:", error);
    res.status(500).json({
      success: false,
      errors: "Internal Server Error",
    });
  }
}

module.exports = {
  login,
  getUserDetails,
};
