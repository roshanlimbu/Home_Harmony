const db = require('../model/index');
const Order = db.order;
const User = require("../model/userModel.js")
const Product = require('../model/productModel.js')


// Create a new order
async function createOrder(req, res) {
  try {
    const { amount, userName, productName, email, quantity, productId, phone } = req.body;

    if (!amount || !productName || !quantity || !email || !phone || !userName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const newOrder = await Order.create({
      // orderId,
      userName,
      quantity,
      email,
      amount,
      productName,
      phone,
    });
    return res.status(201).json({
      message: "Order added successfully",
      newOrder,
      status: "success",
    });
  } catch (error) {
    console.error("Error creating order", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
}

// Get all orders
async function getAllOrders(req, res) {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get order by ID
async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update order by ID
async function updateOrder(req, res) {
  try {
    const { id } = req.params;
    const { userId, productId, quantity } = req.body;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.update({ userId, productId, quantity });
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete order by ID
async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
