const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.get('/', getSettings);
router.put('/', protectAdmin, updateSettings);

module.exports = router;
