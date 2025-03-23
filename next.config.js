/** @type {import('next').NextConfig} */

// Version: 8.1.0 - Corrected React 19 Compatibility Config
const nextConfig = {
  // Core settings
  reactStrictMode: false,
  
  // Development environment settings
  compress: true,
  poweredByHeader: false,
  allowedDevOrigins: ['*'],
  
  // Note: removed invalid experimental options
  
  // Webpack config focusing on React compatibility
  webpack: (config, { isServer }) => {
    // Disable source maps to avoid compatibility issues
    config.devtool = false;
    
    // Handle React 19 JSX Runtime
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react/jsx-runtime': require.resolve('react/jsx-runtime'),
        'react/jsx-dev-runtime': require.resolve('react/jsx-dev-runtime'),
      };
    }
    
    return config;
  }
};

module.exports = nextConfig;