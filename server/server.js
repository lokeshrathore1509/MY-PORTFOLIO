require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const { connectDB } = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const settingRoutes = require('./routes/settingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database
connectDB();

// CORS configuration supporting credentials (cookies & Bearer tokens)
app.use(
  cors({
    origin: (origin, callback) => {
      // Dynamically reflect request origin to support all Vercel domains, localhost, and custom domains
      callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  })
);

// Enable pre-flight across-the-board
app.options('*', cors());

// Body parsers and cookie parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root API Status
app.get('/', (req, res) => {
  res.status(200).send(`
    <div style="font-family: system-ui, sans-serif; background: #050811; color: #fff; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px;">
      <h1 style="color: #38bdf8; margin-bottom: 10px;">🚀 Portfolio Backend API is Running Live!</h1>
      <p style="color: #94a3b8; max-width: 500px; line-height: 1.6;">This is the REST API server for Lokesh Kumar Rathore's Developer Portfolio. Frontend client is deployed separately on Vercel.</p>
      <div style="margin-top: 20px;">
        <a href="/api/projects" style="display: inline-block; padding: 10px 20px; background: #3b82f6; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 5px;">View Projects API</a>
        <a href="/api/health" style="display: inline-block; padding: 10px 20px; background: #1e293b; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 5px;">Health Check</a>
      </div>
    </div>
  `);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingRoutes);

// 404 Route handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found.`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.stack || err.message);
  
  // Handle Multer upload errors
  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`,
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An internal server error occurred.',
  });
});

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT} [Mode: ${process.env.NODE_ENV || 'development'}]`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
});
