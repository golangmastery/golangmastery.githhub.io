import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: ['golang.org'],
    unoptimized: true,
    dangerouslyAllowSVG: true,
  },
  // For static site export
  output: 'export',
  // Remove these if not needed for your deployment
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/golangmastery.githhub.io' : undefined,
  // basePath: process.env.NODE_ENV === 'production' ? '/golangmastery.githhub.io' : undefined,
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
    providerImportSource: "@mdx-js/react",
  },
});

export default withMDX(nextConfig); 