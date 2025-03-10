/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  server: {
    port: 5000,
    host: '0.0.0.0'
  }
};

export default nextConfig;