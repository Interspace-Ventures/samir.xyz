/**
 * Next.js performance optimization configuration
 * @version 3.1.0
 */

export const getPerformanceConfig = () => ({
  // Optimize images
  images: {
    // Use unoptimized images since we're handling optimization ourselves
    unoptimized: true,
    // Implement quality and size limits
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Set domains for image optimization
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // Reduce image quality slightly for faster loading
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Optimize compilation
  compiler: {
    // Remove React properties that aren't used in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize output
  output: 'standalone',
  
  // Reduce fetch cache time for development
  staticPageGenerationTimeout: 120,
  
  // Optimize runtime
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  
  // Disable powered-by header
  poweredByHeader: false,
  
  // Enable compression for faster loading
  compress: true,
  
  // Additional experimental optimizations
  experimental: {
    // CSS optimization
    optimizeCss: true,
    
    // Optimize fonts
    optimizePackageImports: [],
    
    // Minimal Turbopack configuration
    turbo: {
      rules: {
        // Empty rules to avoid webpack conflicts
      }
    },
  }
});