const mongoose = require('mongoose');

const URL = 'mongodb+srv://test:123@cluster0.lx68ky3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
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

