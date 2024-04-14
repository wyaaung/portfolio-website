import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import AuthorLayout from '@/components/layouts/AuthorLayout';
import { allAuthors } from '../../../.contentlayer/generated';

const About = () => {
  const author = allAuthors.find((p) => p.slug === 'about');

  if (!author) {
    return null;
  }

  return (
    <MainLayout>
      <AuthorLayout content={author}>
        <div>ABOUT</div>
      </AuthorLayout>
    </MainLayout>
  );
};

export default About;
