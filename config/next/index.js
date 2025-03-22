// Modular Next.js configuration - v3.1.0
import { experimentalConfig } from './parts/experimental.js';
import { imageConfig } from './parts/images.js';
import { webpackConfig } from './parts/webpack.js';
import { headersConfig } from './parts/headers.js';

export function getNextConfig() {
  return {
    // Core configuration
    reactStrictMode: false,
    distDir: '.next',
    compress: true, // Enable gzip compression for faster transfers
    
    // Fix cross-origin issues in Replit
    crossOrigin: 'anonymous',
    assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
    
    // Origin allowlist - streamlined
    allowedDevOrigins: [
      'localhost:*',
      '*.replit.dev',
      '*.repl.co', 
      '*.janeway.replit.dev'
    ],
    
    // Additional optimizations
    productionBrowserSourceMaps: false,
    poweredByHeader: false,
    
    // Import modular configurations
    experimental: experimentalConfig,
    images: imageConfig,
    webpack: webpackConfig,
    headers: headersConfig,
    
    // Package optimizations
    transpilePackages: ['next'],
  };
}