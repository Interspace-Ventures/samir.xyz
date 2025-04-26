/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The App Router is now stable and no longer requires the experimental flag
  // swcMinify is now the default in Next.js 13+
  
  // Configure server to use PORT environment variable or fallback to 3000
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    host: '0.0.0.0', // Listen on all available network interfaces
  },
};

module.exports = nextConfig;