import path from 'node:path';
import withBundleAnalyzer from '@next/bundle-analyzer';
import withMDX from '@next/mdx';
import type { NextConfig } from 'next';
import { createSearchIndex } from './src/lib/utils/mdx';

// Generate search index immediately
createSearchIndex()
	.then(() => console.log('Search index generated successfully!'))
	.catch((error) => console.error('Error generating search index:', error));

const mdxConfig = withMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
});

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = (() => {
	const baseConfig: NextConfig = {
		reactStrictMode: true,
		pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
		transpilePackages: ['next-mdx-remote'],
		turbopack: {
			root: path.join(__dirname, '..'),
		},
		experimental: {
			turbopackFileSystemCacheForDev: true,
		},
		images: {
			remotePatterns: [
				{
					protocol: 'https',
					hostname: 'picsum.photos',
				},
				{
					protocol: 'http',
					hostname: 'localhost',
				},
			],
		},
	};

	const plugins = [mdxConfig, bundleAnalyzer];
	return plugins.reduce((acc, next) => next(acc), baseConfig);
})();

export default nextConfig;
