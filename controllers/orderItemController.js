const OrderItem = require('../models/orderItem');
const asyncHandler = require("express-async-handler");

const getOrderItems = asyncHandler(async (req, res) => {
  const orderItems = await OrderItem.find().populate('order').populate('menuItem');
  res.json(orderItems);
});

const getOrderItemById = asyncHandler(async (req, res) => {
  const orderItem = await OrderItem.findById(req.params.id).populate('order').populate('menuItem');
  if (!orderItem) return res.status(404).json({ message: 'Order item not found' });
  res.json(orderItem);
});

const createOrderItem = asyncHandler(async (req, res) => {
  const orderItem = new OrderItem({
    order: req.body.order,
    menuItem: req.body.menuItem,
    quantity: req.body.quantity,
    price: req.body.price
  });
  const newOrderItem = await orderItem.save();
  res.status(201).json(newOrderItem);
});

const updateOrderItem = asyncHandler(async (req, res) => {
  const orderItem = await OrderItem.findById(req.params.id);
  if (!orderItem) return res.status(404).json({ message: 'Order item not found' });

  if (req.body.order != null) orderItem.order = req.body.order;
  if (req.body.menuItem != null) orderItem.menuItem = req.body.menuItem;
  if (req.body.quantity != null) orderItem.quantity = req.body.quantity;
  if (req.body.price != null) orderItem.price = req.body.price;

  const updatedOrderItem = await orderItem.save();
  res.json(updatedOrderItem);
});

const deleteOrderItem = asyncHandler(async (req, res) => {
  const orderItem = await OrderItem.findById(req.params.id);
  if (!orderItem) return res.status(404).json({ message: 'Order item not found' });

  await orderItem.remove();
  res.json({ message: 'Order item deleted' });
});

module.exports = {
  getOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem
};

