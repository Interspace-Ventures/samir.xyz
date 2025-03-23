/** @type {import('next').NextConfig} */

// Version: 9.0.0 - React 19 Compatibility Focus
const nextConfig = {
  // Basic settings
  reactStrictMode: false,
  
  // Crucial for Replit environment
  allowedDevOrigins: ['*', 'localhost:*', '*.replit.dev', '*.repl.co', '*.replit.app'],
  
  // Disable source maps completely to avoid any React 19 sourcemap issues
  webpack: (config) => {
    config.devtool = false;
    
    // Using null-loader for any problematic modules
    config.module.rules.push({
      test: /\.(svg|jpg|jpeg|png|gif|webp|ico)$/,
      use: 'null-loader'
    });
    
    return config;
  },
  
  // Disable image optimization to simplify stack
  images: {
    disableStaticImages: true,
    unoptimized: true
  },
  
  // Disable production browser source maps
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;