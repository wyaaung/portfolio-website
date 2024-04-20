'use client';

import React from 'react';
import { CoreContent } from '@/lib/utils/contentlayer';
import { Blog } from 'contentlayer/generated';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/Pagination';
import BlogSearch from '@/components/blog/BlogSearch';

interface Props {
  blogs: CoreContent<Blog>[];
  title: string;
  initialDisplayBlogs?: CoreContent<Blog>[];
  pagination?: React.ComponentProps<typeof Pagination>;
  showSearchBar: boolean;
}

const BlogListLayout = ({
  blogs,
  title,
  initialDisplayBlogs = [],
  pagination,
  showSearchBar = true,
}: Props) => {
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
        {showSearchBar && <BlogSearch setSearchValue={setSearchValue} />}
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

export default BlogListLayout;
