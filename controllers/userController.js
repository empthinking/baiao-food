const User = require('../models/user');
const asyncHandler = require("express-async-handler");
const session = require('express-session');

// Adicionando o controlador de registro de usuário
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password, email, phone, address } = req.body;

  // Verifica se o usuário já existe
  const userExists = await User.findOne({ email });
  if (userExists) {
	res.status(400);
	throw new Error('Usuário já existe');
  }

  // Cria um novo usuário com as informações fornecidas
  const user = await User.create({
	firstName,
	lastName,
	username,
	password, // Lembre-se de adicionar hash à senha antes de salvar no banco de dados real
	email,
	phone,
	address,
  });

  if (user) {
	res.redirect('/index');
  } else {
	res.status(400);
	throw new Error('Erro ao criar usuário');
  }
});
module.exports = {
  registerUser
};