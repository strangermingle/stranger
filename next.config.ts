import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'vwvgpynnjevidaqgglqd.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/bengaluru',
        destination: '/bangalore',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/sitemap-events.xml',
        destination: '/sitemap-events',
      },
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3001/api/:path*'
          : 'https://api.strangermingle.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
