/** @type {import('next').NextConfig} */

// Version: 8.3.0 - Absolute Minimum Configuration for React 19
const nextConfig = {
  // Most simplified minimal config
  reactStrictMode: false,
  
  // Disable source maps - crucial for React 19 with Bun
  webpack: (config) => {
    config.devtool = false;
    return config;
  },
  
  // Disable any cross-origin protection for development
  crossOrigin: 'anonymous',
  
  // Add '*' to allowedOrigins to permit any origin
  experimental: {
    allowedReactFormActions: ['*'],
  },
  
  // Turn off some security headers for development
  poweredByHeader: false,
};

module.exports = nextConfig;