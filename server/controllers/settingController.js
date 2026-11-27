const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const Setting = require('../models/Setting');
const { getIsConnected } = require('../config/db');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');
const { defaultSettings } = require('../seed/initialSeedData');

const VALID_RESUME_TYPES = {
  frontend: {
    label: 'Frontend Resume',
    defaultDownloadName: 'Lokesh_Kumar_Rathore_Frontend_Resume.pdf',
  },
  fullstack: {
    label: 'Full Stack Resume',
    defaultDownloadName: 'Lokesh_Kumar_Rathore_FullStack_Resume.pdf',
  },
};

let memorySettings = {
  ...defaultSettings,
  resumes: {
    frontend: { ...defaultSettings.resumes.frontend },
    fullstack: { ...defaultSettings.resumes.fullstack },
  },
};

const emptyResumeSlot = () => ({
  url: '',
  publicId: null,
  originalName: '',
  updatedAt: null,
});

const getOrCreateSetting = async () => {
  let setting = await Setting.findOne();
  if (!setting) {
    setting = await Setting.create(defaultSettings);
  }
  if (!setting.resumes) {
    setting.resumes = { frontend: emptyResumeSlot(), fullstack: emptyResumeSlot() };
  }
  return setting;
};

const removeStoredResumeAsset = async (existing) => {
  if (!existing) return;

  if (existing.publicId && isCloudinaryConfigured) {
    await cloudinary.uploader
      .destroy(existing.publicId, { resource_type: 'raw' })
      .catch((err) => console.warn('Cloudinary resume cleanup warning:', err.message));
  }

  if (existing.url && existing.url.startsWith('/uploads/')) {
    const uploadsRoot = path.resolve(__dirname, '../uploads');
    const localPath = path.resolve(__dirname, '..', existing.url.replace(/^\/+/, ''));
    if (localPath.startsWith(uploadsRoot) && fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }
  }
};

// @route   GET /api/settings
// @desc    Get public portfolio settings (availability, contact links, headline, resumes)
// @access  Public
const getSettings = async (req, res) => {
  try {
    if (getIsConnected()) {
      const setting = await getOrCreateSetting();
      if (
        setting.linkedinUrl === 'https://www.linkedin.com/in/lokeshrathore/' ||
        setting.linkedinUrl === 'https://www.linkedin.com/in/lokeshrathore'
      ) {
        setting.linkedinUrl = 'https://www.linkedin.com/in/lokesh-rathore-220lr4644';
        await setting.save().catch(() => { });
      }
      return res.status(200).json({ success: true, data: setting });
    }

    return res.status(200).json({ success: true, data: memorySettings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/settings
// @desc    Update portfolio settings
// @access  Private (Admin only)
const updateSettings = async (req, res) => {
  try {
    const { resumes: _ignoredResumes, ...updates } = req.body;

    if (getIsConnected()) {
      const setting = await getOrCreateSetting();
      Object.assign(setting, updates);
      setting.updatedAt = new Date();
      await setting.save();
      return res.status(200).json({ success: true, message: 'Settings updated successfully.', data: setting });
    }

    memorySettings = { ...memorySettings, ...updates, updatedAt: new Date() };
    return res.status(200).json({ success: true, message: 'Settings updated successfully.', data: memorySettings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/settings/resume/:type
// @desc    Upload or replace Frontend / Full Stack resume PDF
// @access  Private (Admin only)
const uploadResume = async (req, res) => {
  const { type } = req.params;
  const meta = VALID_RESUME_TYPES[type];

  if (!meta) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({
      success: false,
      message: 'Invalid resume type. Must be "frontend" or "fullstack".',
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please select a PDF file to upload.',
    });
  }

  try {
    let url = `/uploads/resumes/${req.file.filename}`;
    let publicId = null;

    if (isCloudinaryConfigured) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'portfolio_resumes',
          resource_type: 'raw',
          use_filename: true,
          unique_filename: true,
        });
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        url = result.secure_url;
        publicId = result.public_id;
      } catch (uploadError) {
        console.error('Cloudinary resume upload error:', uploadError);
      }
    }

    const nextSlot = {
      url,
      publicId,
      originalName: req.file.originalname || meta.defaultDownloadName,
      updatedAt: new Date(),
    };

    if (getIsConnected()) {
      const setting = await getOrCreateSetting();
      await removeStoredResumeAsset(setting.resumes?.[type]);
      setting.resumes[type] = nextSlot;
      setting.markModified('resumes');
      setting.updatedAt = new Date();
      await setting.save();
      return res.status(200).json({
        success: true,
        message: `${meta.label} uploaded successfully.`,
        data: setting,
      });
    }

    await removeStoredResumeAsset(memorySettings.resumes?.[type]);
    memorySettings.resumes[type] = nextSlot;
    memorySettings.updatedAt = new Date();
    return res.status(200).json({
      success: true,
      message: `${meta.label} uploaded successfully.`,
      data: memorySettings,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @route   DELETE /api/settings/resume/:type
// @desc    Remove Frontend / Full Stack resume PDF
// @access  Private (Admin only)
const deleteResume = async (req, res) => {
  const { type } = req.params;
  const meta = VALID_RESUME_TYPES[type];

  if (!meta) {
    return res.status(400).json({
      success: false,
      message: 'Invalid resume type. Must be "frontend" or "fullstack".',
    });
  }

  try {
    if (getIsConnected()) {
      const setting = await getOrCreateSetting();
      await removeStoredResumeAsset(setting.resumes?.[type]);
      setting.resumes[type] = emptyResumeSlot();
      setting.markModified('resumes');
      setting.updatedAt = new Date();
      await setting.save();
      return res.status(200).json({
        success: true,
        message: `${meta.label} removed.`,
        data: setting,
      });
    }

    await removeStoredResumeAsset(memorySettings.resumes?.[type]);
    memorySettings.resumes[type] = emptyResumeSlot();
    memorySettings.updatedAt = new Date();
    return res.status(200).json({
      success: true,
      message: `${meta.label} removed.`,
      data: memorySettings,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/settings/resume/:type/download
// @desc    Download Frontend / Full Stack resume as PDF attachment
// @access  Public
const downloadResume = async (req, res) => {
  const { type } = req.params;
  const meta = VALID_RESUME_TYPES[type];

  if (!meta) {
    return res.status(400).json({
      success: false,
      message: 'Invalid resume type. Must be "frontend" or "fullstack".',
    });
  }

  try {
    const setting = getIsConnected() ? await getOrCreateSetting() : memorySettings;
    const slot = setting?.resumes?.[type];

    if (!slot?.url) {
      return res.status(404).json({
        success: false,
        message: `${meta.label} has not been uploaded yet.`,
      });
    }

    const downloadName = (slot.originalName || meta.defaultDownloadName).replace(/["\r\n]/g, '');

    if (slot.url.startsWith('/uploads/')) {
      const uploadsRoot = path.resolve(__dirname, '../uploads');
      const localPath = path.resolve(__dirname, '..', slot.url.replace(/^\/+/, ''));
      if (!localPath.startsWith(uploadsRoot) || !fs.existsSync(localPath)) {
        return res.status(404).json({
          success: false,
          message: 'Resume file not found on server.',
        });
      }
      return res.download(localPath, downloadName);
    }

    // Stream remote (e.g. Cloudinary) PDF with attachment headers so cross-origin download works cleanly
    const upstream = await fetch(slot.url);
    if (!upstream.ok || !upstream.body) {
      return res.status(502).json({
        success: false,
        message: 'Unable to retrieve resume file from storage.',
      });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`);
    return Readable.fromWeb(upstream.body).pipe(res);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings,
  uploadResume,
  deleteResume,
  downloadResume,
};
