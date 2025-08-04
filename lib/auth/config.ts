export const AUTH_CONFIG = {
    USERNAME: process.env.NEXT_PUBLIC_AUTH_USERNAME || 'admin',
    // Store hashed password in environment variable
    PASSWORD_HASH: process.env.NEXT_PUBLIC_AUTH_PASSWORD_HASH,
    SESSION_KEY: 'receipt_auth_token',
    SESSION_DURATION: 24 * 60 * 60 * 1000 // 24 hours
  }
  