/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  allowedDevOrigins: ['*.replit.dev', '*.repl.co', '*.janeway.replit.dev', '*.worf.replit.dev'],
  
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
};

module.exports = nextConfig;