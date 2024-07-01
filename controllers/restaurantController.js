const Restaurant = require('../models/restaurant');
const asyncHandler = require("express-async-handler");

const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
  res.json(restaurant);
});

const createRestaurant = asyncHandler(async (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    description: req.body.description,
    phone: req.body.phone,
    address: req.body.address,
    category: req.body.category,
    rating: req.body.rating
  });
  const newRestaurant = await restaurant.save();
  res.status(201).json(newRestaurant);
});

const updateRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

  if (req.body.name != null) restaurant.name = req.body.name;
  if (req.body.description != null) restaurant.description = req.body.description;
  if (req.body.phone != null) restaurant.phone = req.body.phone;
  if (req.body.address != null) restaurant.address = req.body.address;
  if (req.body.category != null) restaurant.category = req.body.category;
  if (req.body.rating != null) restaurant.rating = req.body.rating;

  const updatedRestaurant = await restaurant.save();
  res.json(updatedRestaurant);
});

const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

  await restaurant.remove();
  res.json({ message: 'Restaurant deleted' });
});

module.exports = {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
};

