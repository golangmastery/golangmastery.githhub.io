/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  
  // Disable typescript checking temporarily
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 