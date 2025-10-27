import type { Metadata } from 'next/types';
import { siteMetaData } from '@/data/siteMetaData';
import MainLayout from '@/layouts/MainLayout';
import BlogListLayout from '@/layouts/mdx/BlogListLayout';
import { allCoreContent, getAllBlogs, getAllTags } from '@/lib/utils/mdx';
import { BLOGS_PER_PAGE } from '@/types/constants';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ pageNumber: string }>;
}): Promise<Metadata> {
	const { pageNumber: pageNumberStr } = await params;
	const pageNumber = Number.parseInt(pageNumberStr, 10);
	const blogs = await getAllBlogs();
	const activeBlogs = blogs.filter((blog) => blog.frontmatter.draft === false);
	const totalPages = Math.ceil(activeBlogs.length / BLOGS_PER_PAGE);

	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wyaaung.vercel.app';
	const url = `${baseUrl}/blogs/page/${pageNumber}`;

	const startIndex = BLOGS_PER_PAGE * (pageNumber - 1);
	const endIndex = BLOGS_PER_PAGE * pageNumber;
	const currentPageBlogs = allCoreContent(activeBlogs).slice(startIndex, endIndex);

	const blogTitles = currentPageBlogs
		.slice(0, 3)
		.map((blog) => blog.frontmatter.title)
		.join(', ');
	const description = `Blog posts page ${pageNumber} of ${totalPages}. ${currentPageBlogs.length > 0 ? `Featured posts: ${blogTitles}${currentPageBlogs.length > 3 ? ' and more' : ''}.` : ''} Read my latest thoughts on software engineering, web development, and technology.`;

	return {
		title: `Blog Posts - Page ${pageNumber} | ${siteMetaData.author}`,
		description,
		keywords: [
			siteMetaData.author,
			'Software Engineer',
			'Portfolio',
			'Blog',
			'Tech Blog',
			'Web Development',
			'Programming',
			'JavaScript',
			'TypeScript',
			'React',
			'Next.js',
			'Node.js',
			'CSS',
			'Tailwind CSS',
			'Java',
			'Spring',
			'Docker',
			'Kubernetes',
			'AWS',
		].join(', '),
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

const Blogs = async ({ params }: { params: Promise<{ pageNumber: string }> }) => {
	const { pageNumber: pageNumberStr } = await params;
	const pageNumber = Number.parseInt(pageNumberStr, 10);
	const blogs = await getAllBlogs();
	const activeBlogs = blogs.filter((blog) => blog.frontmatter.draft === false);
	const coreBlogsData = allCoreContent(activeBlogs);
	const tagCounts = getAllTags(activeBlogs);
	const initialDisplayBlogs = coreBlogsData.slice(
		BLOGS_PER_PAGE * (pageNumber - 1),
		BLOGS_PER_PAGE * pageNumber,
	);

	const totalPages = Math.ceil(activeBlogs.length / BLOGS_PER_PAGE);

	const pagination = {
		currentPage: pageNumber,
		totalPages,
	};

	return (
		<MainLayout>
			<BlogListLayout
				blogs={coreBlogsData}
				initialDisplayBlogs={initialDisplayBlogs}
				pagination={pagination}
				tagCounts={tagCounts}
				title='Blogs'
			/>
		</MainLayout>
	);
};

export default Blogs;
