const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { getIsConnected } = require('../config/db');
const { JWT_SECRET } = require('../middleware/authMiddleware');

// Helper to generate JWT
const generateToken = (id, email) => {
  return jwt.sign({ id, email, role: 'admin' }, JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Cookie options
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

// @route   POST /api/auth/login
// @desc    Authenticate admin & set cookie
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@portfolio.dev').toLowerCase();
    const envAdminPass = process.env.ADMIN_PASSWORD || 'Admin@2026!';

    let adminUser = null;

    if (getIsConnected()) {
      adminUser = await Admin.findOne({ email: normalizedEmail });
      
      // If DB is connected but admin doesn't exist yet, auto-seed with env credentials if matches
      if (!adminUser && normalizedEmail === envAdminEmail) {
        if (password === envAdminPass) {
          adminUser = await Admin.create({
            email: envAdminEmail,
            password: envAdminPass,
            name: 'Lokesh Kumar Rathore',
            role: 'admin',
          });
        }
      }

      if (!adminUser) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }

      const isMatch = await adminUser.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }
    } else {
      // Offline fallback authentication
      if (normalizedEmail !== envAdminEmail || password !== envAdminPass) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }
      adminUser = {
        _id: 'local-admin-id',
        email: envAdminEmail,
        name: 'Lokesh Kumar Rathore',
        role: 'admin',
      };
    }

    const token = generateToken(adminUser._id, adminUser.email);

    // Set secure HTTP-only cookie
    res.cookie('admin_token', token, getCookieOptions());

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: adminUser._id,
        email: adminUser.email,
        name: adminUser.name || 'Lokesh Kumar Rathore',
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.',
    });
  }
};

// @route   GET /api/auth/me
// @desc    Verify current admin session
// @access  Protected
const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.admin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   POST /api/auth/logout
// @desc    Clear auth cookie
// @access  Public
const logout = async (req, res) => {
  res.clearCookie('admin_token', getCookieOptions());
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
};

module.exports = {
  login,
  getMe,
  logout,
};
