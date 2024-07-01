const User = require('../models/user');
const asyncHandler = require("express-async-handler");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

const createUser = asyncHandler(async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address
  });
  const newUser = await user.save();
  res.status(201).json(newUser);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (req.body.username != null) user.username = req.body.username;
  if (req.body.password != null) user.password = req.body.password;
  if (req.body.email != null) user.email = req.body.email;
  if (req.body.phone != null) user.phone = req.body.phone;
  if (req.body.address != null) user.address = req.body.address;

  const updatedUser = await user.save();
  res.json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.remove();
  res.json({ message: 'User deleted' });
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

