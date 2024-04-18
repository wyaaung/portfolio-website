import React from 'react';
import MainLayout from '@/layouts/MainLayout';

export default function BlogPost({ params }: { params: { slug: string } }) {
  console.log(params);
  return (
    <>
      <MainLayout>
        <span>Under Construction</span>
      </MainLayout>
    </>
  );
}

// export default BlogPost;
