import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import ListLayout from '@/layouts/mdx/ListLayout';
import { allBlogs } from 'contentlayer/generated';

export const metadata = {
  title: 'About - William (Wai Yan Aung)',
  description: 'About me - William (Wai Yan Aung)',
};

const Blogs = () => {
  const activeBlogs = allBlogs.filter((p) => p.draft === false);

  return (
    <MainLayout>
      <ListLayout blogs={activeBlogs} title="Blogs" />
    </MainLayout>
  );
};

export default Blogs;
