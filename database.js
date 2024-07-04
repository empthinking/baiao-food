const mongoose = require('mongoose');

const URL = ''
// Conectar ao banco de dados

async function connectDB() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URL);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

