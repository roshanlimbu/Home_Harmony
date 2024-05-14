const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../model/index");

const Users = db.users;

async function signup(req, res) {
  let check = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing user found with same email address",
    });
  }

  // Hashing the password here

  const hashedPassword = await bcrypt.hash(req.body.password.toString(), 10);

  let cart = {};
  for (let i = 0; i < 100; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: hashedPassword,
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
}

module.exports = {
  signup,
};
