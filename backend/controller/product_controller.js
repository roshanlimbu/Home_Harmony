const db = require("../model/index");
const fs = require("fs");
const path = require("path");
const Product = db.product;

exports.addProduct = async (req, res) => {
  try {
    const { name, category, description, new_price, old_price, available } =
      req.body;

    console.log(req.body);
    const image = req.file.filename;
    if (
      !name ||
      !image ||
      !description ||
      !category ||
      !new_price ||
      !old_price
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const product = await Product.create({
      name,
      image,
      description,
      category,
      new_price,
      old_price,
      available: available || true,
    });

    return res.status(201).json({
      message: "Product added successfully",
      product,
      status: "success",
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const deletedProduct = await Product.destroy({
      where: { id: productId },
    });
    const imagePath = path.join(__dirname, "../upload/", product.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const { name, category } = req.query;

    let condition = {};
    if (name) {
      condition.name = { [db.Sequelize.Op.like]: `%${name}%` };
    }
    if (category) {
      condition.category = category;
    }

    const products = await Product.findAll({ where: condition });

    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error searching for products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.showAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching all products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
