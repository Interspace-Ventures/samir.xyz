/** @type {import('next').NextConfig} */

// Version: 7.0.0 - Absolute Minimum Config
const nextConfig = {
  // Core settings - absolute minimum
  reactStrictMode: false,
  
  // Only include critical webpack config
  webpack: (config) => {
    // Disable source maps completely 
    config.devtool = false;
    return config;
  }
};

module.exports = nextConfig;