const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protectAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getProjects);
router.get('/:slugOrId', getProject);

// Protected Admin routes
router.post('/', protectAdmin, upload.single('thumbnail'), createProject);
router.put('/:id', protectAdmin, upload.single('thumbnail'), updateProject);
router.delete('/:id', protectAdmin, deleteProject);

module.exports = router;
