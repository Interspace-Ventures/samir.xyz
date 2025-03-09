/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure images work properly
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  // Configure server to use port 5000 to match Replit's configuration
  serverRuntimeConfig: {
    port: 5000
  },
  // Ensure pages are served from the correct base path
  basePath: '',
  // Disable any redirects that might interfere with routing
  async redirects() {
    return []
  }
};

export default nextConfig;