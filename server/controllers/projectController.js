const Project = require('../models/Project');
const { getIsConnected } = require('../config/db');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');
const { initialProjects } = require('../seed/initialSeedData');
const fs = require('fs');

// In-memory fallback storage if MongoDB is offline
let memoryProjects = [...initialProjects.map((p, idx) => ({ ...p, _id: `mem-${idx + 1}` }))];

// Helper to upload image to Cloudinary or return local path
const handleImageUpload = async (file) => {
  if (!file) return { imageUrl: null, publicId: null };

  if (isCloudinaryConfigured) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'portfolio_projects',
        resource_type: 'image',
      });
      // Delete temporary local file after successful Cloudinary upload
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      return { imageUrl: result.secure_url, publicId: result.public_id };
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      // Fallback to local path if Cloudinary fails
      return { imageUrl: `/uploads/${file.filename}`, publicId: null };
    }
  }

  // Local storage fallback
  return { imageUrl: `/uploads/${file.filename}`, publicId: null };
};

// @route   GET /api/projects
// @desc    Get all public or all projects (if admin query)
// @access  Public
const getProjects = async (req, res) => {
  try {
    const showAll = req.query.all === 'true';

    if (getIsConnected()) {
      const query = showAll ? {} : { isPublished: true };
      const projects = await Project.find(query).sort({ displayOrder: 1, createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: projects.length,
        data: projects,
      });
    }

    // In-memory fallback
    const filtered = showAll
      ? memoryProjects
      : memoryProjects.filter((p) => p.isPublished !== false);
    
    // Sort by displayOrder
    filtered.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    return res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch projects.',
    });
  }
};

// @route   GET /api/projects/:slugOrId
// @desc    Get single project by slug or ID
// @access  Public
const getProject = async (req, res) => {
  try {
    const { slugOrId } = req.params;

    if (getIsConnected()) {
      let project = null;
      if (slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
        project = await Project.findById(slugOrId);
      }
      if (!project) {
        project = await Project.findOne({ slug: slugOrId });
      }

      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }

      return res.status(200).json({ success: true, data: project });
    }

    const project = memoryProjects.find(
      (p) => p.slug === slugOrId || p._id === slugOrId
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private (Admin only)
const createProject = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      category,
      technologies,
      liveUrl,
      githubUrl,
      featured,
      isPublished,
      displayOrder,
      details,
      imageUrl,
    } = req.body;

    if (!title || !shortDescription) {
      return res.status(400).json({
        success: false,
        message: 'Title and short description are required.',
      });
    }

    // Parse technologies if passed as comma-separated string or JSON string
    let parsedTechnologies = [];
    if (typeof technologies === 'string') {
      try {
        parsedTechnologies = JSON.parse(technologies);
      } catch {
        parsedTechnologies = technologies.split(',').map((t) => t.trim()).filter(Boolean);
      }
    } else if (Array.isArray(technologies)) {
      parsedTechnologies = technologies;
    }

    // Parse details if JSON string
    let parsedDetails = {};
    if (typeof details === 'string') {
      try {
        parsedDetails = JSON.parse(details);
      } catch {
        parsedDetails = { overview: details };
      }
    } else if (typeof details === 'object' && details !== null) {
      parsedDetails = details;
    }

    // Upload thumbnail if provided
    let finalImageUrl = imageUrl || '/project-finance.png';
    let publicId = null;

    if (req.file) {
      const uploadResult = await handleImageUpload(req.file);
      if (uploadResult.imageUrl) {
        finalImageUrl = uploadResult.imageUrl;
        publicId = uploadResult.publicId;
      }
    }

    // Generate unique slug
    const slugBase = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const slug = `${slugBase}-${Date.now().toString().slice(-4)}`;

    const projectData = {
      title,
      slug,
      shortDescription,
      category: category || 'Full Stack',
      technologies: parsedTechnologies,
      image: finalImageUrl,
      imagePublicId: publicId,
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
      featured: featured === 'true' || featured === true,
      isPublished: isPublished !== 'false' && isPublished !== false,
      displayOrder: Number(displayOrder) || (memoryProjects.length + 1),
      details: parsedDetails,
    };

    if (getIsConnected()) {
      const newProject = await Project.create(projectData);
      return res.status(201).json({
        success: true,
        message: 'Project created successfully.',
        data: newProject,
      });
    }

    // In-memory fallback
    const memNewProject = {
      ...projectData,
      _id: `mem-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryProjects.unshift(memNewProject);

    return res.status(201).json({
      success: true,
      message: 'Project created successfully (in-memory mode).',
      data: memNewProject,
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create project.',
    });
  }
};

// @route   PUT /api/projects/:id
// @desc    Update an existing project
// @access  Private (Admin only)
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // Process technologies
    if (updates.technologies) {
      if (typeof updates.technologies === 'string') {
        try {
          updates.technologies = JSON.parse(updates.technologies);
        } catch {
          updates.technologies = updates.technologies.split(',').map((t) => t.trim()).filter(Boolean);
        }
      }
    }

    // Process details
    if (updates.details) {
      if (typeof updates.details === 'string') {
        try {
          updates.details = JSON.parse(updates.details);
        } catch {
          updates.details = { overview: updates.details };
        }
      }
    }

    // Convert booleans
    if (typeof updates.featured !== 'undefined') {
      updates.featured = updates.featured === 'true' || updates.featured === true;
    }
    if (typeof updates.isPublished !== 'undefined') {
      updates.isPublished = updates.isPublished === 'true' || updates.isPublished === true;
    }
    if (typeof updates.displayOrder !== 'undefined') {
      updates.displayOrder = Number(updates.displayOrder);
    }

    // Handle new image upload
    if (req.file) {
      const uploadResult = await handleImageUpload(req.file);
      if (uploadResult.imageUrl) {
        updates.image = uploadResult.imageUrl;
        updates.imagePublicId = uploadResult.publicId;
      }
    }

    if (getIsConnected()) {
      const project = await Project.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Project updated successfully.',
        data: project,
      });
    }

    // In-memory fallback
    const index = memoryProjects.findIndex((p) => p._id === id || p.slug === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    memoryProjects[index] = {
      ...memoryProjects[index],
      ...updates,
      updatedAt: new Date(),
    };

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: memoryProjects[index],
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private (Admin only)
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }

      // If project has Cloudinary image publicId, optionally delete from Cloudinary
      if (project.imagePublicId && isCloudinaryConfigured) {
        try {
          await cloudinary.uploader.destroy(project.imagePublicId);
        } catch (e) {
          console.warn('Failed to delete image from Cloudinary:', e.message);
        }
      }

      await Project.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: 'Project deleted successfully.',
      });
    }

    // In-memory fallback
    const index = memoryProjects.findIndex((p) => p._id === id || p.slug === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    memoryProjects.splice(index, 1);

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
