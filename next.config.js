/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  // Ensure server runs on port 3000 to match Replit configuration
  serverRuntimeConfig: {
    port: 3000
  }
}

module.exports = nextConfig
