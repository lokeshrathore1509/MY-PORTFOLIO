const express = require('express');
const router = express.Router();
const { login, getMe, logout } = require('../controllers/authController');
const { protectAdmin } = require('../middleware/authMiddleware');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post('/login', loginLimiter, login);
router.get('/me', protectAdmin, getMe);
router.post('/logout', logout);

module.exports = router;
