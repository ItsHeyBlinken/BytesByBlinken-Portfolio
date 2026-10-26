const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Fail fast: refuse to start without a real JWT_SECRET and ADMIN_PASSWORD_HASH.
const { getAuthConfig } = require('./config/auth');
try {
  getAuthConfig();
} catch (error) {
  console.error(error.message);
  console.error('Set the missing values in the environment (see .env.example) and restart.');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: [
    'https://bytesbyblinken.com',
    'http://localhost:3000',
    'http://localhost:5000'
  ],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Test database connection
const db = require('./config/database');

// Routes
app.use('/api', (req, res, next) => {
  if (req.path === '/') {
    res.json({
      message: 'Portfolio Blog Backend API',
      version: '1.0.0',
      endpoints: {
        posts: '/api/posts',
        comments: '/api/comments',
        auth: '/api/auth',
        health: '/health'
      }
    });
  } else {
    next();
  }
});

app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/auth', require('./routes/auth'));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    await db.query('SELECT NOW()');
    res.json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'unhealthy', 
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Blog Backend API',
    version: '1.0.0',
    endpoints: {
      posts: '/api/posts',
      comments: '/api/comments',
      auth: '/api/auth',
      health: '/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
