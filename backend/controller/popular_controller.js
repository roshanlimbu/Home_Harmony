const db = require("../model/index");
const Product = db.product;
exports.popular = async (req, res) => {
  try {
    let products = await Product.findAll({
      category: "kitchenware",
    });
    let popular_in_kitchenware = products.slice(0, 4);
    console.log("Popular in kitchenware fetched.");
    res.send(popular_in_kitchenware);
  } catch (error) {
    console.error("Error fetching popular in kitchenware: ", error);
    return res.status(404).send({ status: "404 Not Found" });
  }
};
