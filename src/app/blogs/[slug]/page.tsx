import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import MDXLayoutRenderer from '@/components/MDXComponents';
import { siteMetaData } from '@/data/siteMetaData';
import MainLayout from '@/layouts/MainLayout';
import BlogLayout from '@/layouts/mdx/BlogLayout';
import {
	coreContent,
	formatBlogLink,
	getAllBlogs,
	getBlogBySlug,
	getBlogWithNavigation,
} from '@/lib/utils/mdx';

// Generate static params for all blog posts
export async function generateStaticParams() {
	const blogs = await getAllBlogs();
	return blogs.map((blog) => ({
		slug: blog.slug,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const blog = await getBlogBySlug(slug);

	if (!blog) {
		return {};
	}

	const _publishedAt = new Date(blog.frontmatter.date).toISOString();
	const _modifiedAt = new Date(blog.frontmatter.lastmod || blog.frontmatter.date).toISOString();
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wyaaung.vercel.app';
	const url = `${baseUrl}/blogs/${slug}`;

	return {
		title: blog.frontmatter.title,
		description: blog.frontmatter.summary,
		keywords: blog.frontmatter.tags?.join(', '),
		authors: [{ name: siteMetaData.author }],
		creator: siteMetaData.author,
		publisher: siteMetaData.author,
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		alternates: {
			canonical: url,
		},
	};
}

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	// Use the optimized function that gets blog and navigation in one operation
	const result = await getBlogWithNavigation(slug);

	if (!result) {
		return notFound();
	}

	const { blog, prev, next } = result;

	return (
		<MainLayout>
			<BlogLayout
				content={coreContent(blog)}
				prev={formatBlogLink(prev)}
				next={formatBlogLink(next)}
			>
				<MDXLayoutRenderer toc={blog.toc} content={blog} />
			</BlogLayout>
		</MainLayout>
	);
};

export default BlogPage;
