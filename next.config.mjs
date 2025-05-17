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
  output: 'export',
  // If your repository name is 'golangmastery.githhub.io', basePath and assetPrefix are usually not needed
  // when deploying to USERNAME.github.io/REPOSITORY_NAME if REPOSITORY_NAME is the same as in the URL.
  // However, if deploying to a custom domain or the root USERNAME.github.io, they are not needed.
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