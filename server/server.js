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

// CORS configuration supporting credentials (cookies)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman) or if origin is in whitelist
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS policy'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Body parsers and cookie parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
