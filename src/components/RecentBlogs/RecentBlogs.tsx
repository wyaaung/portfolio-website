import type { Blog } from 'contentlayer/generated';
import Link from 'next/link';
import React from 'react';

import BlogCard from '@/components/Blog/BlogCard';
import { MAX_RECENT_BLOG } from '@/types/constants';

interface RecentBlogsProps {
  blogs: Omit<Blog, 'body' | '_raw' | '_id'>[];
}

const RecentBlogs = ({ blogs }: RecentBlogsProps) => {
  const slicedBlogs = blogs.slice(0, MAX_RECENT_BLOG);

  return (
    <div className="mt-6">
      <div className="divide-gray-200 dark:divide-gray-700">
        <h3 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Recent Blogs
        </h3>
        <ul>
          {slicedBlogs.map(({ slug, title, tags, summary }, index) => (
            <BlogCard
              key={slug}
              title={title}
              slug={slug}
              summary={summary}
              tags={tags}
              index={index}
            />
          ))}
        </ul>
      </div>
      {blogs.length > MAX_RECENT_BLOG && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link href="/blogs">
            <span className="underline-magical cursor-pointer font-bold" aria-label="all blogs">
              Read All Blogs &rarr;
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentBlogs;
