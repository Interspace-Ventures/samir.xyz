/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  
  images: {
    domains: ['localhost', '0.0.0.0'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400,
    unoptimized: false,
  }
};

module.exports = nextConfig;