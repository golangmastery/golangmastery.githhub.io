/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Adjust this for production
      },
    ],
  },
  output: 'standalone',
  
  // Disable typescript checking temporarily
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Update experimental settings to be compatible with Next.js 15
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = nextConfig; 