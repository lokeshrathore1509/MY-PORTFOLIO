const Message = require('../models/Message');
const { getIsConnected } = require('../config/db');

// In-memory fallback for messages
let memoryMessages = [];

// @route   POST /api/contact
// @desc    Submit a contact form message
// @access  Public
const submitMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message.',
      });
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      });
    }

    if (getIsConnected()) {
      const newMessage = await Message.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been received successfully. I will get back to you soon.',
        data: newMessage,
      });
    }

    // In-memory fallback
    const memMsg = {
      _id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      read: false,
      createdAt: new Date(),
    };
    memoryMessages.unshift(memMsg);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received successfully.',
      data: memMsg,
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please reach out directly to lokeshrathore1509@gmail.com.',
    });
  }
};

// @route   GET /api/contact/messages
// @desc    Get all messages (Admin)
// @access  Private (Admin only)
const getMessages = async (req, res) => {
  try {
    if (getIsConnected()) {
      const messages = await Message.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: messages.length,
        data: messages,
      });
    }

    return res.status(200).json({
      success: true,
      count: memoryMessages.length,
      data: memoryMessages,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PATCH /api/contact/messages/:id/read
// @desc    Mark message as read
// @access  Private (Admin only)
const markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const msg = await Message.findByIdAndUpdate(id, { read: true }, { new: true });
      if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
      return res.status(200).json({ success: true, data: msg });
    }

    const msg = memoryMessages.find((m) => m._id === id);
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
    msg.read = true;

    return res.status(200).json({ success: true, data: msg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @route   DELETE /api/contact/messages/:id
// @desc    Delete message
// @access  Private (Admin only)
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const msg = await Message.findByIdAndDelete(id);
      if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
      return res.status(200).json({ success: true, message: 'Message deleted successfully.' });
    }

    const index = memoryMessages.findIndex((m) => m._id === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Message not found' });
    memoryMessages.splice(index, 1);

    return res.status(200).json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  submitMessage,
  getMessages,
  markMessageAsRead,
  deleteMessage,
};
