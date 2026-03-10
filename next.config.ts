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
        hostname: 'uuanzogrkoomekskvxab.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://checkout.razorpay.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' blob: data: https://uuanzogrkoomekskvxab.supabase.co https://images.unsplash.com https://res.cloudinary.com; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://checkout.razorpay.com; connect-src 'self' https://uuanzogrkoomekskvxab.supabase.co https://lumberjack-cx.razorpay.com;",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/sitemap-events.xml',
        destination: '/sitemap-events',
      },
    ];
  },
  serverExternalPackages: ['razorpay'],
};

export default nextConfig;
