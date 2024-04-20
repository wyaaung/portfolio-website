'use client';

import React from 'react';
import { CoreContent } from '@/lib/utils/contentlayer';
import { Blog } from 'contentlayer/generated';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/Pagination';

interface Props {
  blogs: CoreContent<Blog>[];
  title: string;
  initialDisplayBlogs?: CoreContent<Blog>[];
  pagination?: React.ComponentProps<typeof Pagination>;
}

const ListLayout = ({ blogs, title, initialDisplayBlogs = [], pagination }: Props) => {
  const [searchValue, setSearchValue] = React.useState('');

  const filteredBlogPosts = blogs.filter((blog) => {
    const searchContent = blog.title + blog.summary + blog.tags?.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const displayBlogs =
    initialDisplayBlogs.length > 0 && !searchValue ? initialDisplayBlogs : filteredBlogPosts;

  return (
    <>
      <div className="space-y-2 rounded-lg pt-8 pb-3 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          {title}
        </h1>
        <div className="relative max-w-full">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles"
            className="block w-full rounded-md border-0 bg-gray-200 bg-opacity-50 px-4 py-3 text-gray-900 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute right-3 top-3 h-6 w-6 text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <ul>
          {displayBlogs.map(({ slug, title, tags, summary }, index) => (
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
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  );
};

export default ListLayout;
