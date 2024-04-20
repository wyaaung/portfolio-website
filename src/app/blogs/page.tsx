import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import BlogListLayout from '@/layouts/mdx/BlogListLayout';
import { allBlogs } from 'contentlayer/generated';
import { sortBlogs } from '@/lib/utils/contentlayer';
import { BLOGS_PER_PAGE } from '@/types/constants';

export const metadata = {
  title: 'Blogs - William (Wai Yan Aung)',
  description: 'My Blogs - William (Wai Yan Aung)',
};

const Blogs = () => {
  const activeBlogs = allBlogs.filter((blog) => blog.draft === false);
  const blogs = sortBlogs(activeBlogs);
  const initialDisplayBlogs = blogs.slice(0, BLOGS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(blogs.length / BLOGS_PER_PAGE),
  };

  return (
    <MainLayout>
      <BlogListLayout
        blogs={activeBlogs}
        initialDisplayBlogs={initialDisplayBlogs}
        pagination={pagination}
        title="Blogs"
      />
    </MainLayout>
  );
};

export default Blogs;
