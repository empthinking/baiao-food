const Payment = require('../models/payment');
const asyncHandler = require("express-async-handler");

const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find().populate('order');
  res.json(payments);
});

const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id).populate('order');
  if (!payment) return res.status(404).json({ message: 'Payment not found' });
  res.json(payment);
});

const createPayment = asyncHandler(async (req, res) => {
  const payment = new Payment({
    order: req.body.order,
    amount: req.body.amount,
    paymentMethod: req.body.paymentMethod,
    status: req.body.status
  });
  const newPayment = await payment.save();
  res.status(201).json(newPayment);
});

const updatePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) return res.status(404).json({ message: 'Payment not found' });

  if (req.body.order != null) payment.order = req.body.order;
  if (req.body.amount != null) payment.amount = req.body.amount;
  if (req.body.paymentMethod != null) payment.paymentMethod = req.body.paymentMethod;
  if (req.body.status != null) payment.status = req.body.status;

  const updatedPayment = await payment.save();
  res.json(updatedPayment);
});

const deletePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) return res.status(404).json({ message: 'Payment not found' });

  await payment.remove();
  res.json({ message: 'Payment deleted' });
});

module.exports = {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
};

