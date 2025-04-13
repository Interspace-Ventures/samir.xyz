/** @type {import('next').NextConfig} */

// Next.js configuration with updated properties
const nextConfig = {
  // Disable strict mode to prevent double rendering in development
  reactStrictMode: false,
  
  // Disable source maps to avoid errors
  productionBrowserSourceMaps: false,
  
  // Simplify image handling
  images: {
    unoptimized: true,
  },
  
  // Transpile dependencies that may not be ESM compatible
  transpilePackages: [
    '@radix-ui',
    'lucide-react',
    'class-variance-authority',
    'tailwind-merge'
  ],
  
  // Server configuration
  serverExternalPackages: [],
  
  // Add security headers for cross-origin
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ],
      },
    ];
  }
};

export default nextConfig;