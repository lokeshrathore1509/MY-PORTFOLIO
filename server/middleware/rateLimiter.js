const rateLimit = require('express-rate-limit');

// Rate limiting for admin login attempts: 5 per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please wait 15 minutes before trying again.',
  },
});

// Rate limiting for contact form submissions: 5 per 10 minutes
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 6,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact submissions from this IP. Please wait a few minutes.',
  },
});

module.exports = { loginLimiter, contactLimiter };
