require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

const Admin = require('../models/Admin');
const Project = require('../models/Project');
const Setting = require('../models/Setting');
const { initialProjects, defaultSettings } = require('./initialSeedData');

const seedAll = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
  console.log(`⏳ Connecting to MongoDB at ${mongoURI}...`);

  try {
    await mongoose.connect(mongoURI);
    console.log(' Connected to MongoDB Atlas.');

    // 1. Seed Admin
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@portfolio.dev').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@2026!';
    
    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      admin = new Admin({
        email: adminEmail,
        password: adminPassword,
        name: 'Lokesh Kumar Rathore',
        role: 'admin',
      });
      await admin.save();
      console.log(` Created initial admin account: ${adminEmail}`);
    } else {
      console.log(`ℹ️ Admin account already exists: ${adminEmail}`);
    }

    // 2. Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(initialProjects);
      console.log(` Seeded ${initialProjects.length} initial projects.`);
    } else {
      console.log(`ℹ️ Database already contains ${projectCount} projects.`);
    }

    // 3. Seed Settings
    let setting = await Setting.findOne();
    if (!setting) {
      await Setting.create(defaultSettings);
      console.log(' Created default portfolio settings.');
    } else {
      console.log('ℹ️ Portfolio settings already exist.');
    }

    console.log(' Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedAll();
