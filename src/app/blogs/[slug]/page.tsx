import type { Blog } from 'contentlayer/generated';
import { allBlogs } from 'contentlayer/generated';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

import MDXLayoutRenderer from '@/components/MDXComponents';
import MainLayout from '@/layouts/MainLayout';
import BlogLayout from '@/layouts/mdx/BlogLayout';
import { coreContent, formatBlogLink, sortBlogs } from '@/lib/utils/contentlayer';

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
  const postIndex = sortedBlogs.findIndex((blog) => blog.slug === slug);

  const prevContent = sortedBlogs[postIndex + 1] || null;
  const prev = prevContent ? coreContent(prevContent) : null;
  const nextContent = sortedBlogs[postIndex - 1] || null;
  const next = nextContent ? coreContent(nextContent) : null;

  if (!blog) {
    return notFound();
  }

  return (
    <>
      <MainLayout>
        <BlogLayout content={blog} prev={formatBlogLink(prev)} next={formatBlogLink(next)}>
          <MDXLayoutRenderer toc={blog.toc} content={blog} />
        </BlogLayout>
      </MainLayout>
    </>
  );
};

export default BlogPage;
