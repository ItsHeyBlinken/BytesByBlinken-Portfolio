const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getAuthConfig } = require('../config/auth');

// Admin credentials come from the environment (ADMIN_USERNAME, ADMIN_PASSWORD_HASH).
// The JWT signing secret comes from JWT_SECRET. All are validated at startup in server.js.
const { adminUsername: ADMIN_USERNAME, adminPasswordHash: ADMIN_PASSWORD_HASH, jwtSecret: JWT_SECRET } = getAuthConfig();

// Simple test route to verify loading
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route is working!' });
});

// GET login test route
router.get('/login', (req, res) => {
  res.json({ message: 'Login endpoint reached via GET', method: 'GET' });
});

// POST login - Admin authentication endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check username
    if (username !== ADMIN_USERNAME) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: ADMIN_USERNAME, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: { username: ADMIN_USERNAME, role: 'admin' },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET verify token
router.get('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    res.json({ valid: true, user });
  });
});

// POST logout (client-side token removal)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

module.exports = router;
