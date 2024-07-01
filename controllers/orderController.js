const Order = require('../models/order');
const asyncHandler = require("express-async-handler");

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user').populate('restaurant');
  res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user').populate('restaurant');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

const createOrder = asyncHandler(async (req, res) => {
  const order = new Order({
    user: req.body.user,
    restaurant: req.body.restaurant,
    totalAmount: req.body.totalAmount,
    status: req.body.status
  });
  const newOrder = await order.save();
  res.status(201).json(newOrder);
});

const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  if (req.body.user != null) order.user = req.body.user;
  if (req.body.restaurant != null) order.restaurant = req.body.restaurant;
  if (req.body.totalAmount != null) order.totalAmount = req.body.totalAmount;
  if (req.body.status != null) order.status = req.body.status;

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  await order.remove();
  res.json({ message: 'Order deleted' });
});

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};

