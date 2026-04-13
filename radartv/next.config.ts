import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deibisromero.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'elradartv.cl',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
