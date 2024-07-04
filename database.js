const mongoose = require('mongoose');

const URL = 'mongodb+srv://admin:0Rx81B8OKhkWgZYj@cluster0.oaekar8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Conectar ao banco de dados

const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

