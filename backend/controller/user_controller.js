const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../model/index");
const Users = db.users;
const CartItems = db.cartItem;
const Products = db.product;

async function login(req, res) {
  const { email, password } = req.body;

  if (email === 'admin@gmail.com' && password === 'admin123') {
    const data = {
      user: {
        id: 1, // Assuming admin user has id 1
        role: 'admin',
      },
    };
    const token = jwt.sign(data, process.env.SECRET_KEY || 'secret_ecom');
    return res.json({
      success: true,
      token,
    });
  }

  let user = await Users.findOne({
    where: {
      email,
    },
  });

  if (user) {
    const userVerify = await bcrypt.compare(password.toString(), user.password);
    if (userVerify) {
      const data = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      const token = jwt.sign(data, process.env.SECRET_KEY || 'secret_ecom');
      return res.json({
        success: true,
        token,
      });
    }
  }

  return res.status(401).json({
    success: false,
    errors: "Invalid credentials",
  });
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

    if (!user) {
      return res.json({
        success: false,
        errors: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        cartItems: user.cartItems,
      },
    });
  } catch (error) {
    console.error("Error getting user details:", error);
    res.status(500).json({
      success: false,
      errors: "Internal Server Error",
    });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await Users.findAll({
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

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error getting all users:", error);
    res.status(500).json({
      success: false,
      errors: "Internal Server Error",
    });
  }
}

module.exports = {
  login,
  getUserDetails,
  getAllUsers
};
