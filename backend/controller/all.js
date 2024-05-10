// Creating Endpoint for regestering the user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({
    email: req.body.email,
  });
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
  let user = await Users.findOne({
    email: req.body.email,
  });
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
});

app.get("/newcollection", async (req, res) => {
  let products = await Product.find({});
  let newCollection = products.slice(1).slice(-8);
  console.log("New collection fetched.");
  res.send(newCollection);
});

app.get("/popular", async (req, res) => {
  let products = await Product.find({
    category: "kitchenware",
  });
  let popular_in_kitchenware = products.slice(0, 4);
  console.log("Popular in kitchenware fetched.");
  res.send(popular_in_kitchenware);
});

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({
      errors: "Please authentiacte.",
    });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({
        errors: "Please authentiacte with valid token.",
      });
    }
  }
};

app.post("/addtocart", fetchUser, async (req, res) => {
  console.log(req.body);
  // let userData = await Users.findOne({ _id: req.user.id });
  // userData.cartData[req.body.itemId] += 1;
  // await Users.findOneAndUpdate(
  //   { _id: req.user.id },
  //   { cartData: userData.userData },
  // );
  // res.send("Added");
});
