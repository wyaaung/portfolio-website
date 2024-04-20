import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allBlogs, Blog } from 'contentlayer/generated';
import MainLayout from '@/layouts/MainLayout';
import BlogLayout from '@/layouts/mdx/BlogLayout';
import MDXLayoutRenderer from '@/components/MDXComponents';
import { sortBlogs } from '@/lib/utils/contentlayer';

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

const BlogPage = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const sortedBlogs = sortBlogs(allBlogs);

  const blog = sortedBlogs.find((blog) => blog.slug === slug) as Blog;

  if (!blog) {
    return notFound();
  }

  return (
    <>
      <MainLayout>
        <BlogLayout content={blog}>
          <MDXLayoutRenderer toc={blog.toc} content={blog} />
        </BlogLayout>
      </MainLayout>
    </>
  );
};

export default BlogPage;
