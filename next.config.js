const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: ['golangmastery.github.io'],
    unoptimized: true,
  },
  webpack: (config) => {
    return config;
  },
  output: 'export',
};
let config;
try {
  config = withMDX(nextConfig);
} catch (err) {
  // Ensure thrown error is an instance of Error
  if (!(err instanceof Error)) {
    throw new Error(String(err));
  }
  throw err;
}
module.exports = config;

module.exports = withMDX(nextConfig);
