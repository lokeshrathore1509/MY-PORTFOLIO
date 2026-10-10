const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  availabilityText: {
    type: String,
    default: 'Available for opportunities',
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  headline: {
    type: String,
    default: 'Building Modern Web Experiences That Make an Impact.',
  },
  supportingText: {
    type: String,
    default: 'Frontend Developer | React.js | Full-Stack Web Development',
  },
  shortBio: {
    type: String,
    default: 'I build responsive, interactive, and user-focused web applications using modern frontend technologies and full-stack tools.',
  },
  email: {
    type: String,
    default: 'lokeshrathore1509@gmail.com',
  },
  githubUrl: {
    type: String,
    default: 'https://github.com/lokeshrathore1509',
  },
  linkedinUrl: {
    type: String,
    default: 'https://www.linkedin.com/in/lokesh-rathore-220lr4644',
  },
  phone: {
    type: String,
    default: '+91 8318585916',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Setting', settingSchema);
