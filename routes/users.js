var express = require('express');
var router = express.Router();
const User = require('../models/user');
var { registerUser, loginUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/login', loginUser);
router.get('/login', (req, res) => {
  res.render('login');
});


module.exports = router;
