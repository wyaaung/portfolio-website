import type { MetadataRoute } from 'next';
import { getAllBlogs, getAllTags } from '@/lib/utils/mdx';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wyaaung.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const blogs = await getAllBlogs();
	const tags = getAllTags(blogs);

	// Static pages
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/blogs`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9,
		},
	];

	// Blog posts
	const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
		url: `${baseUrl}/blogs/${blog.slug}`,
		lastModified: new Date(blog.frontmatter.lastmod || blog.frontmatter.date),
		changeFrequency: 'monthly' as const,
		priority: 0.7,
	}));

	// Tag pages
	const tagPages: MetadataRoute.Sitemap = Object.keys(tags).map((tag) => ({
		url: `${baseUrl}/tags/${tag}`,
		lastModified: new Date(),
		changeFrequency: 'weekly' as const,
		priority: 0.6,
	}));

	return [...staticPages, ...blogPages, ...tagPages];
}
