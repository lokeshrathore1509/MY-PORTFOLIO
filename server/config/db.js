const mongoose = require('mongoose');
const dns = require('dns');

// Configure public DNS servers to prevent querySrv ECONNREFUSED issues on local Windows networks
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore in environments where setting DNS servers is restricted
}

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
  
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 8000,
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
