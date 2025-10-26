'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';

import BlogCard from '@/components/Blog/BlogCard';
import Pagination from '@/components/Pagination';
import TagList from '@/components/Tag/TagList';
import type { BlogPost, CoreContent } from '@/lib/utils/mdx';

interface Props {
	blogs: CoreContent<BlogPost>[];
	title: string;
	initialDisplayBlogs?: CoreContent<BlogPost>[];
	pagination?: React.ComponentProps<typeof Pagination>;
	tagCounts?: Record<string, number>;
}

const BlogListLayout = ({
	blogs,
	title,
	initialDisplayBlogs = [],
	pagination,
	tagCounts = {},
}: Props) => {
	const pathname = usePathname();

	const tagKeys = Object.keys(tagCounts);
	const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

	const displayBlogs = initialDisplayBlogs.length > 0 ? initialDisplayBlogs : blogs;

	return (
		<>
			<div className='space-y-2 rounded-lg pt-8 pb-3 md:space-y-5'>
				<h1 className='font-extrabold text-3xl text-gray-900 leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100'>
					{title}
				</h1>
			</div>
			<div className='flex sm:space-x-24'>
				<div className='hidden h-full max-h-screen min-w-[250px] max-w-[250px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40'>
					<div className='px-6 py-4'>
						{pathname.startsWith('/blogs') ? (
							<h3 className='font-bold text-cyan-500 text-xl uppercase'>All Blogs</h3>
						) : (
							<Link
								href='/blogs'
								className='font-bold text-gray-700 uppercase hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400'
							>
								All Blogs
							</Link>
						)}
						<TagList tags={sortedTags} tagCounts={tagCounts} pathname={pathname} />
					</div>
				</div>
				<div>
					<ul>
						{displayBlogs.map(({ slug, frontmatter }, index) => (
							<BlogCard
								key={slug}
								title={frontmatter.title}
								slug={slug}
								summary={frontmatter.summary}
								tags={frontmatter.tags}
								index={index}
							/>
						))}
					</ul>
				</div>
			</div>
			{pagination && pagination.totalPages > 1 && (
				<Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
			)}
		</>
	);
};

export default BlogListLayout;
