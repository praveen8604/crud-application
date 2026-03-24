require('dotenv').config();
const mongoose = require('mongoose');

const databaseconnection = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.log('Database connection failed', err.message);
    throw err;
  }
};

module.exports = databaseconnection;



