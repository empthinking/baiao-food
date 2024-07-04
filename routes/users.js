var express = require('express');
var router = express.Router();
const User = require('../models/user');
var { registerUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;
