import React from 'react';
import { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';
import { allBlogs } from 'contentlayer/generated';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const blog = allBlogs.find((p) => p.slug === slug);

  if (!blog) {
    return {};
  }

  return {
    title: blog.title,
    description: blog.summary,
  };
}

const Blog = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <MainLayout>
        <span>Under Construction</span>
      </MainLayout>
    </>
  );
};

export default Blog;
