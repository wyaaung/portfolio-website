import { allAuthors } from 'contentlayer/generated';
import React from 'react';

import MDXLayoutRenderer from '@/components/MDXComponents';
import MainLayout from '@/layouts/MainLayout';
import AuthorLayout from '@/layouts/mdx/AuthorLayout';

export const metadata = {
  title: 'About - William (Wai Yan Aung)',
  description: 'About me - William (Wai Yan Aung)',
};

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
