import React from 'react';
import { slug } from 'github-slugger';
import MainLayout from '@/layouts/MainLayout';
import { allBlogs } from 'contentlayer/generated';
import { allCoreContent, sortBlogs } from '@/lib/utils/contentlayer';
import BlogListLayout from '../../../layouts/mdx/BlogListLayout';

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
