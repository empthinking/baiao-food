const MenuItem = require('../models/menuItem');
const asyncHandler = require("express-async-handler");

const getMenuItems = asyncHandler(async (req, res) => {
  const menuItems = await MenuItem.find().populate('menu');
  res.json(menuItems);
});

const getMenuItemById = asyncHandler(async (req, res) => {
  const menuItem = await MenuItem.findById(req.params.id).populate('menu');
  if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
  res.json(menuItem);
});

const createMenuItem = asyncHandler(async (req, res) => {
  const menuItem = new MenuItem({
    menu: req.body.menu,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  });
  const newMenuItem = await menuItem.save();
  res.status(201).json(newMenuItem);
});

const updateMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await MenuItem.findById(req.params.id);
  if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

  if (req.body.menu != null) menuItem.menu = req.body.menu;
  if (req.body.name != null) menuItem.name = req.body.name;
  if (req.body.description != null) menuItem.description = req.body.description;
  if (req.body.price != null) menuItem.price = req.body.price;

  const updatedMenuItem = await menuItem.save();
  res.json(updatedMenuItem);
});

const deleteMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await MenuItem.findById(req.params.id);
  if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

  await menuItem.remove();
  res.json({ message: 'Menu item deleted' });
});

module.exports = {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};

