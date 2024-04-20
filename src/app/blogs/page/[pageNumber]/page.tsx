import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { allBlogs } from 'contentlayer/generated';
import { sortBlogs } from '@/lib/utils/contentlayer';
import { BLOGS_PER_PAGE } from '@/types/constants';
import ListLayout from '@/layouts/mdx/ListLayout';

export const metadata = {
  title: 'Blogs - William (Wai Yan Aung)',
  description: 'My Blogs - William (Wai Yan Aung)',
};

const Blogs = ({ params }: { params: { pageNumber: string } }) => {
  const pageNumber = parseInt(params.pageNumber);
  const blogs = sortBlogs(allBlogs);
  const initialDisplayBlogs = blogs.slice(
    BLOGS_PER_PAGE * (pageNumber - 1),
    BLOGS_PER_PAGE * pageNumber
  );

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);

  const pagination = {
    currentPage: pageNumber,
    totalPages,
  };

  return (
    <MainLayout>
      <ListLayout
        blogs={blogs}
        initialDisplayBlogs={initialDisplayBlogs}
        pagination={pagination}
        title="All Posts"
      />
    </MainLayout>
  );
};

export default Blogs;