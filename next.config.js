/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Disabled to allow API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
