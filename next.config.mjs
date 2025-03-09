/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure images work properly
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  // Configure server to use environment port or default to 5000
  serverRuntimeConfig: {
    port: parseInt(process.env.PORT || '5000', 10)
  },
  // Ensure pages are served from the correct base path
  basePath: '',
  // Disable any redirects that might interfere with routing
  async redirects() {
    return []
  },
  // Enable static file serving from the public directory
  experimental: {
    appDir: false
  }
};

export default nextConfig;