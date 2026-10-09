const express = require('express');
const router = express.Router();
const {
  submitMessage,
  getMessages,
  markMessageAsRead,
  deleteMessage,
} = require('../controllers/contactController');
const { protectAdmin } = require('../middleware/authMiddleware');
const { contactLimiter } = require('../middleware/rateLimiter');

// Public contact submission with rate limiting
router.post('/', contactLimiter, submitMessage);

// Protected Admin message management
router.get('/messages', protectAdmin, getMessages);
router.patch('/messages/:id/read', protectAdmin, markMessageAsRead);
router.delete('/messages/:id', protectAdmin, deleteMessage);

module.exports = router;
