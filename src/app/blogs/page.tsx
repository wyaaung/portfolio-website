import type { Metadata } from 'next';
import { siteMetaData } from '@/data/siteMetaData';
import MainLayout from '@/layouts/MainLayout';
import BlogListLayout from '@/layouts/mdx/BlogListLayout';
import { allCoreContent, getAllBlogs, getAllTags } from '@/lib/utils/mdx';
import { BLOGS_PER_PAGE } from '@/types/constants';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wyaaung.vercel.app';

export const metadata: Metadata = {
	title: `Blog - ${siteMetaData.author}`,
	description: `Read my blog posts about software engineering, web development, and technology. ${siteMetaData.description} sharing insights and tutorials.`,
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
		canonical: `${baseUrl}/blogs`,
	},
};

const Blogs = async () => {
	const blogs = await getAllBlogs();
	const activeBlogs = blogs.filter((blog) => blog.frontmatter.draft === false);
	const coreBlogsData = allCoreContent(activeBlogs);
	const tagCounts = getAllTags(activeBlogs);
	const initialDisplayBlogs = coreBlogsData.slice(0, BLOGS_PER_PAGE);
	const pagination = {
		currentPage: 1,
		totalPages: Math.ceil(activeBlogs.length / BLOGS_PER_PAGE),
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
