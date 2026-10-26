// Auth configuration, read once at startup.
// Required: JWT_SECRET and ADMIN_PASSWORD_HASH. Optional: ADMIN_USERNAME (default "admin").
// The server refuses to start if a required value is missing or is a known placeholder.

const PLACEHOLDER_SECRETS = new Set([
  'your-secret-key',
  'changeme-jwt-secret-min-32-chars-long-here',
  'your-super-secret-jwt-key-change-this-in-production'
]);

const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

function loadAuthConfig(env = process.env) {
  const errors = [];

  const jwtSecret = (env.JWT_SECRET || '').trim();
  if (!jwtSecret) {
    errors.push('JWT_SECRET is not set.');
  } else if (PLACEHOLDER_SECRETS.has(jwtSecret)) {
    errors.push('JWT_SECRET is still a placeholder value. Generate a unique random secret.');
  }

  const adminPasswordHash = (env.ADMIN_PASSWORD_HASH || '').trim();
  if (!adminPasswordHash) {
    errors.push('ADMIN_PASSWORD_HASH is not set.');
  } else if (!BCRYPT_HASH_PATTERN.test(adminPasswordHash)) {
    errors.push('ADMIN_PASSWORD_HASH is not a valid bcrypt hash.');
  }

  const adminUsername = (env.ADMIN_USERNAME || 'admin').trim();

  if (errors.length > 0) {
    const error = new Error(`Invalid auth configuration:\n- ${errors.join('\n- ')}`);
    error.code = 'INVALID_AUTH_CONFIG';
    throw error;
  }

  return Object.freeze({ jwtSecret, adminPasswordHash, adminUsername });
}

let cachedConfig = null;

function getAuthConfig() {
  if (!cachedConfig) {
    cachedConfig = loadAuthConfig();
  }
  return cachedConfig;
}

module.exports = { loadAuthConfig, getAuthConfig };
