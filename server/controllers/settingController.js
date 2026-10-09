const Setting = require('../models/Setting');
const { getIsConnected } = require('../config/db');
const { defaultSettings } = require('../seed/initialSeedData');

let memorySettings = { ...defaultSettings };

// @route   GET /api/settings
// @desc    Get public portfolio settings (availability, contact links, headline)
// @access  Public
const getSettings = async (req, res) => {
  try {
    if (getIsConnected()) {
      let setting = await Setting.findOne();
      if (!setting) {
        setting = await Setting.create(defaultSettings);
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
    const updates = req.body;

    if (getIsConnected()) {
      let setting = await Setting.findOne();
      if (!setting) {
        setting = await Setting.create({ ...defaultSettings, ...updates });
      } else {
        Object.assign(setting, updates);
        setting.updatedAt = new Date();
        await setting.save();
      }
      return res.status(200).json({ success: true, message: 'Settings updated successfully.', data: setting });
    }

    memorySettings = { ...memorySettings, ...updates, updatedAt: new Date() };
    return res.status(200).json({ success: true, message: 'Settings updated successfully.', data: memorySettings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSettings, updateSettings };
