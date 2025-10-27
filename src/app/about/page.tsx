import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import MDXLayoutRenderer from '@/components/MDXComponents';
import { siteMetaData } from '@/data/siteMetaData';
import MainLayout from '@/layouts/MainLayout';
import AuthorLayout from '@/layouts/mdx/AuthorLayout';
import { getAuthor } from '@/lib/utils/mdx';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wyaaung.vercel.app';

export const metadata: Metadata = {
	title: `About - ${siteMetaData.author}`,
	description: `Learn more about ${siteMetaData.author}, ${siteMetaData.description}. Get to know my background, skills, and experience in software engineering.`,
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
		canonical: `${baseUrl}/about`,
	},
};

const About = async () => {
	const author = await getAuthor();

	if (!author) {
		return notFound();
	}

	return (
		<MainLayout>
			<AuthorLayout content={author}>
				<MDXLayoutRenderer content={author} />
			</AuthorLayout>
		</MainLayout>
	);
};

export default About;
