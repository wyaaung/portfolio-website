import withBundleAnalyzer from '@next/bundle-analyzer';
import withMDX from '@next/mdx';
import type { NextConfig } from 'next';

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
	};

	const plugins = [mdxConfig, bundleAnalyzer];
	return plugins.reduce((acc, next) => next(acc), baseConfig);
})();

export default nextConfig;
