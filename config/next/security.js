/**
 * Next.js security configuration
 * @version 3.1.0
 */

export const getSecurityConfig = () => ({
  // Cross Origin settings
  crossOrigin: 'anonymous',
  
  // CORS allowed origins for development
  allowedDevOrigins: [
    'localhost:*',
    '*.replit.dev',
    '*.repl.co', 
    '*.janeway.replit.dev'
  ],
  
  // Headers configuration for CORS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
          // Add security headers
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  }
});