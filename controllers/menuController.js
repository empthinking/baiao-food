const Menu = require('../models/menu');
const asyncHandler = require("express-async-handler");

const getMenus = asyncHandler(async (req, res) => {
  const menus = await Menu.find().populate('restaurant');
  res.json(menus);
});

const getMenuById = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id).populate('restaurant');
  if (!menu) return res.status(404).json({ message: 'Menu not found' });
  res.json(menu);
});

const createMenu = asyncHandler(async (req, res) => {
  const menu = new Menu({
    restaurant: req.body.restaurant,
    name: req.body.name,
    description: req.body.description
  });
  const newMenu = await menu.save();
  res.status(201).json(newMenu);
});

const updateMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);
  if (!menu) return res.status(404).json({ message: 'Menu not found' });

  if (req.body.restaurant != null) menu.restaurant = req.body.restaurant;
  if (req.body.name != null) menu.name = req.body.name;
  if (req.body.description != null) menu.description = req.body.description;

  const updatedMenu = await menu.save();
  res.json(updatedMenu);
});

const deleteMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);
  if (!menu) return res.status(404).json({ message: 'Menu not found' });

  await menu.remove();
  res.json({ message: 'Menu deleted' });
});

module.exports = {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
};

