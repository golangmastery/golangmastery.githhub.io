import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import withBundleAnalyzer from '@next/bundle-analyzer';

const analyzeBundles = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
  generateStatsFile: true,
  statsFilename: 'stats.json',
});

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
  // Helps with static site routing
  trailingSlash: true,
  // Remove these if not needed for your deployment
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/golangmastery.githhub.io' : undefined,
  // basePath: process.env.NODE_ENV === 'production' ? '/golangmastery.githhub.io' : undefined,
  
  // Use rewrites for backward compatibility
  async rewrites() {
    return [
      {
        source: '/courses/quick-start-with-golang',
        destination: '/courses/quick-start-with-golang-modules',
      },
      {
        source: '/courses/quick-start-with-golang/:slug*',
        destination: '/courses/quick-start-with-golang-modules/:slug*',
      }
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug, 
      [rehypeHighlight, {
        alias: {
          go: 'golang',
          js: 'javascript',
          ts: 'typescript',
          jsx: 'javascript',
          tsx: 'typescript',
          sh: 'bash'
        },
        ignoreMissing: true,
        subset: false,
        detect: true,
        theme: 'vs2015' // Using a VS Code-like theme
      }]
    ],
    providerImportSource: "@mdx-js/react",
  },
});

export default analyzeBundles(withMDX(nextConfig)); 