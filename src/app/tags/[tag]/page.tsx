import { allBlogs } from 'contentlayer/generated';
import { slug } from 'github-slugger';
import React from 'react';

import MainLayout from '@/layouts/MainLayout';
import BlogListLayout from '@/layouts/mdx/BlogListLayout';
import { allCoreContent, sortBlogs } from '@/lib/utils/contentlayer';

export const metadata = {
  title: 'Blogs - William (Wai Yan Aung)',
  description: 'My Blogs - William (Wai Yan Aung)',
};

const Tag = ({ params }: { params: { tag: string } }) => {
  const tag = params.tag;
  const blogs = allCoreContent(
    sortBlogs(
      allBlogs.filter((blog) => blog.tags && blog.tags.map((tag) => slug(tag)).includes(tag))
    )
  );
  return (
    <MainLayout>
      <BlogListLayout blogs={blogs} title={tag} />
    </MainLayout>
  );
};

export default Tag;
