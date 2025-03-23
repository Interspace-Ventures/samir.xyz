/** @type {import('next').NextConfig} */

// Version: 10.1.0 - Bare Minimum Config for Static Generation
const nextConfig = {
  // Disable all advanced features to avoid any React 19 compatibility issues
  output: 'export',

  // No JavaScript, use static HTML mode only for now
  reactStrictMode: false,
  
  // Simplified images config - treat all as static files
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;