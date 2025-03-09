/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure images work properly
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development'
  }
};

export default nextConfig;