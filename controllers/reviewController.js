const Review = require('../models/review');
const asyncHandler = require("express-async-handler");

const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().populate('user').populate('restaurant');
  res.json(reviews);
});

const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id).populate('user').populate('restaurant');
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.json(review);
});

const createReview = asyncHandler(async (req, res) => {
  const review = new Review({
    user: req.body.user,
    restaurant: req.body.restaurant,
    rating: req.body.rating,
    comment: req.body.comment
  });
  const newReview = await review.save();
  res.status(201).json(newReview);
});

const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });

  if (req.body.user != null) review.user = req.body.user;
  if (req.body.restaurant != null) review.restaurant = req.body.restaurant;
  if (req.body.rating != null) review.rating = req.body.rating;
  if (req.body.comment != null) review.comment = req.body.comment;

  const updatedReview = await review.save();
  res.json(updatedReview);
});

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });

  await review.remove();
  res.json({ message: 'Review deleted' });
});

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};

