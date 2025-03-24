/** @type {import('next').NextConfig} */

// Version: 10.2.0 - Config for hybrid static/dynamic rendering
const nextConfig = {
  // Enable React strict mode for better error catching
  reactStrictMode: true,
  
  // Configure image domains and optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Allow proper hydration of client components and cross-origin requests
  experimental: {
    // Suppress specific Next.js errors that might occur during development
    scrollRestoration: true,
    // Allow cross-origin requests in development
    allowedDevOrigins: ['*']
  },
  
  // Enable CORS for development purposes
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  }
};

module.exports = nextConfig;