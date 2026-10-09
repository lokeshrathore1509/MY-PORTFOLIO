const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
  
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB connection warning: ${error.message}`);
    console.warn(`ℹ️ The application will operate with in-memory / fallback data if MongoDB is unreachable.`);
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
