/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure images work properly
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  // Ensure pages are served from the correct base path
  basePath: '',
  // Reference configuration files in their new locations
  typescript: {
    tsconfigPath: './tsconfig.json'
  }
};

export default nextConfig;