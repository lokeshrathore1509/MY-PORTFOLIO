const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { getIsConnected } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_portfolio_jwt_key_2026_dev_fallback';

const protectAdmin = async (req, res, next) => {
  try {
    let token = null;

    // 1. Check HTTP-only cookie
    if (req.cookies && req.cookies.admin_token) {
      token = req.cookies.admin_token;
    } 
    // 2. Check Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Please log in as administrator.',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // If MongoDB is connected, find the admin in the database
    if (getIsConnected()) {
      const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Admin account not found or token invalid.',
        });
      }
      req.admin = admin;
    } else {
      // In-memory / env fallback validation
      req.admin = {
        _id: decoded.id || 'fallback_admin_id',
        email: decoded.email || process.env.ADMIN_EMAIL || 'admin@portfolio.dev',
        role: 'admin',
        name: 'Lokesh Kumar Rathore',
      };
    }

    next();
  } catch (error) {
    console.error('Auth verification error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session. Please log in again.',
    });
  }
};

module.exports = { protectAdmin, JWT_SECRET };
