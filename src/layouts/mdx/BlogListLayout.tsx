'use client';

import React from 'react';
import { CoreContent, getAllTags } from '@/lib/utils/contentlayer';
import { allBlogs, Blog } from 'contentlayer/generated';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/Pagination';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// import { slug } from 'github-slugger';
// import Tag from '@/components/blog/tag/Tag';
// import BlogSearch from '@/components/blog/BlogSearch';
import TagList from '@/components/blog/tag/TagList';

interface Props {
  blogs: CoreContent<Blog>[];
  title: string;
  initialDisplayBlogs?: CoreContent<Blog>[];
  pagination?: React.ComponentProps<typeof Pagination>;
  // showSearchBar?: boolean;
}

const BlogListLayout = ({
  blogs,
  title,
  initialDisplayBlogs = [],
  pagination,
}: // showSearchBar = true,
Props) => {
  const pathname = usePathname();
  // const [searchValue, setSearchValue] = React.useState('');

  const tagCounts = getAllTags(allBlogs);
  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

  // const filteredBlogPosts = blogs.filter((blog) => {
  //   const searchContent = blog.title + blog.summary + blog.tags?.join(' ');
  //   return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  // });

  const displayBlogs = initialDisplayBlogs.length > 0 ? initialDisplayBlogs : blogs;

  return (
    <>
      <div>
        <div className="space-y-2 rounded-lg pt-8 pb-3 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[250px] max-w-[250px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              {pathname.startsWith('/blogs') ? (
                <h3 className="font-bold uppercase text-cyan-500">All Blogs</h3>
              ) : (
                <Link
                  href="/blogs"
                  className="font-bold uppercase text-gray-700 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-500"
                >
                  All Blogs
                </Link>
              )}
              <TagList tags={sortedTags} tagCounts={tagCounts} pathname={pathname} />
            </div>
          </div>
          <div>
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
        </div>
        {pagination && pagination.totalPages > 1 && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </div>
    </>
  );
};

export default BlogListLayout;
