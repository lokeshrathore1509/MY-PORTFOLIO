const express = require('express');
const router = express.Router();
const {
  getSettings,
  updateSettings,
  uploadResume,
  deleteResume,
  downloadResume,
} = require('../controllers/settingController');
const { protectAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getSettings);
router.put('/', protectAdmin, updateSettings);

router.get('/resume/:type/download', downloadResume);
router.post('/resume/:type', protectAdmin, upload.resume.single('resume'), uploadResume);
router.delete('/resume/:type', protectAdmin, deleteResume);

module.exports = router;
