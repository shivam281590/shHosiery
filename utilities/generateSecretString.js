const crypto = require('crypto');

// Generate a random secret key of 64 characters (32 bytes)
const sessionSecret = crypto.randomBytes(32).toString('hex');

console.log('******set session cookie secret in your .env file******');
console.log(`SESSION_COOKIE_SECRET=${sessionSecret}`);
