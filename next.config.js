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
    unoptimized: true, // Required for static export with GitHub Pages
  },
  output: 'export', // Changed from 'standalone' to 'export' for static site generation
  
  // Base path for GitHub Pages
  basePath: '',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://golangmastery.github.io' : '',
  
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
  
  // Configure trailing slash for better compatibility with GitHub Pages
  trailingSlash: true,
};

module.exports = nextConfig; 