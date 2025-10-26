import type { Metadata } from 'next';
import { siteMetaData } from '@/data/siteMetaData';
import MainLayout from '@/layouts/MainLayout';
import BlogListLayout from '@/layouts/mdx/BlogListLayout';
import { allCoreContent, getAllBlogs, getAllTags } from '@/lib/utils/mdx';

// Simple slug function that matches rehype-slug behavior
function createSlug(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '');
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ tag: string }>;
}): Promise<Metadata> {
	const { tag } = await params;
	const allBlogs = await getAllBlogs();
	const tagCounts = getAllTags(allBlogs);
	const blogs = allCoreContent(
		allBlogs.filter((blog) => blog.frontmatter.tags?.map((t) => createSlug(t)).includes(tag)),
	);

	const tagName = Object.keys(tagCounts).find((key) => createSlug(key) === tag) || tag;
	const postCount = blogs.length;
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wyaaung.vercel.app';
	const url = `${baseUrl}/tags/${tag}`;

	return {
		title: `${tagName} - ${siteMetaData.author}`,
		description: `${postCount} blog posts about ${tagName} by ${siteMetaData.author}`,
		keywords: [tagName, 'blog', 'posts', siteMetaData.author].join(', '),
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

const Tag = async ({ params }: { params: Promise<{ tag: string }> }) => {
	const { tag } = await params;
	const allBlogs = await getAllBlogs();
	const tagCounts = getAllTags(allBlogs);
	const blogs = allCoreContent(
		allBlogs.filter((blog) => blog.frontmatter.tags?.map((t) => createSlug(t)).includes(tag)),
	);
	return (
		<MainLayout>
			<BlogListLayout blogs={blogs} tagCounts={tagCounts} title={tag} />
		</MainLayout>
	);
};

export default Tag;
