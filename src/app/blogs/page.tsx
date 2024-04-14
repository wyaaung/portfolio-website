import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import ListLayout from '@/layouts/mdx/ListLayout';

export const metadata = {
  title: 'About - William (Wai Yan Aung)',
  description: 'About me - William (Wai Yan Aung)',
};

const Blogs = () => {
  return (
    <MainLayout>
      <ListLayout title="Blogs" />
    </MainLayout>
  );
};

export default Blogs;
