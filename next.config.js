// frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Use remotePatterns to specify allowed image sources for Next.js Image component
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost', // Your backend hostname
        port: '3001',          // Your backend port
        pathname: '/images/**', // The path where your backend serves static images
      },
      // Add other image sources if you use external CDNs, etc.
    ],
  },
};

module.exports = nextConfig;
