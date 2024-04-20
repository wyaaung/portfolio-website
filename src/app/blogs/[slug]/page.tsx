import React from 'react';
import { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';
import { allBlogs, Blog } from 'contentlayer/generated';
import BlogLayout from '@/layouts/mdx/BlogLayout';
import MDXLayoutRenderer from '@/components/MDXComponents';
import { sortBlogs } from '@/lib/utils/contentlayer';
import { notFound } from 'next/navigation';

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
  const sortedPosts = sortBlogs(allBlogs);

  const post = sortedPosts.find((p) => p.slug === slug) as Blog;

  if (!post) {
    return notFound();
  }

  return (
    <>
      <MainLayout>
        <BlogLayout content={post}>
          <MDXLayoutRenderer toc={post.toc} content={post} />
        </BlogLayout>
      </MainLayout>
    </>
  );
};

export default BlogPage;
