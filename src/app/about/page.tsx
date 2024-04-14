import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import AuthorLayout from '@/layouts/AuthorLayout';
import { allAuthors } from 'contentlayer/generated';
import MDXLayoutRenderer from '@/components/MDXComponents';

const About = () => {
  const author = allAuthors.find((p) => p.slug === 'about');

  if (!author) {
    return null;
  }

  return (
    <MainLayout>
      <AuthorLayout content={author}>
        <MDXLayoutRenderer content={author} />
      </AuthorLayout>
    </MainLayout>
  );
};

export default About;
