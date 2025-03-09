/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  // Configure server to run on port 5000
  serverRuntimeConfig: {
    port: 5000
  }
};

export default nextConfig;