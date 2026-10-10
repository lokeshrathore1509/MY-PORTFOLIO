const dns = require('dns');
try { dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']); } catch(e){}
const mongoose = require('mongoose');
require('dotenv').config();
const Setting = require('../models/Setting');

async function updateDb() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  console.log('Connected to MongoDB Atlas!');

  const allBefore = await Setting.find({});
  console.log('Current settings in DB:', JSON.stringify(allBefore, null, 2));

  const res = await Setting.updateMany(
    {},
    { 
      $set: { 
        githubUrl: 'https://github.com/lokeshrathore1509',
        linkedinUrl: 'https://www.linkedin.com/in/lokesh-rathore-220lr4644'
      } 
    }
  );
  console.log('Update result:', res);

  const allAfter = await Setting.find({});
  console.log('Updated settings in DB:', JSON.stringify(allAfter, null, 2));

  await mongoose.disconnect();
  console.log('Done!');
}

updateDb().catch((err) => {
  console.error('Update script failed:', err);
  process.exit(1);
});
