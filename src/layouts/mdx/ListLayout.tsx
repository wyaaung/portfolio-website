'use client';

import React from 'react';
import { CoreContent } from '@/lib/utils/contentlayer';
import { Blog } from 'contentlayer/generated';

interface Props {
  blogs: CoreContent<Blog>;
  title: string;
  initialDisplayBlogs?: CoreContent<Blog>[];
}

const ListLayout = ({ blogs, title, initialDisplayBlogs = [] }: Props) => {
  return (
    <div>
      <div className="space-y-2 rounded-lg pt-8 pb-3 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default ListLayout;
