const db = require("../model/index");
const Product = db.product;
exports.newCollection = async (req, res) => {
  try {
    let products = await Product.findAll({});
    let newCollection = products.slice(1).slice(-8);
    console.log("New collection fetched.");
    res.send(newCollection);
  } catch (err) {
    console.error("Error fetching new collection" + err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
