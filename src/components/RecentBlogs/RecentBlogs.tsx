import Link from 'next/link';

import BlogCard from '@/components/Blog/BlogCard';
import type { BlogPost, CoreContent } from '@/lib/utils/mdx';
import { MAX_RECENT_BLOG } from '@/types/constants';

interface RecentBlogsProps {
	blogs: CoreContent<BlogPost>[];
}

const RecentBlogs = ({ blogs }: RecentBlogsProps) => {
	const slicedBlogs = blogs.slice(0, MAX_RECENT_BLOG);

	return (
		<div className='mt-6'>
			<div className='divide-gray-200 dark:divide-gray-700'>
				<h3 className='font-extrabold text-2xl text-gray-900 leading-9 tracking-tight sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 dark:text-gray-100'>
					Recent Blogs
				</h3>
				<ul>
					{slicedBlogs.map(({ slug, frontmatter }, index) => (
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
			{blogs.length > MAX_RECENT_BLOG && (
				<div className='flex justify-end font-medium text-base leading-6'>
					<Link href='/blogs' aria-label='Read all blogs'>
						<span className='underline-magical cursor-pointer font-bold'>
							Read All Blogs &rarr;
						</span>
					</Link>
				</div>
			)}
		</div>
	);
};

export default RecentBlogs;
