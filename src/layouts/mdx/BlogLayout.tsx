import type React from 'react';

import PageTitle from '@/components/Blog/PageTitle';
import PostNavigation from '@/components/Blog/PostNavigation';
import formatDate from '@/lib/utils/formatDate';
import type { BlogPost, CoreContent } from '@/lib/utils/mdx';

interface Props {
  content: CoreContent<BlogPost>;
  children: React.ReactNode;
  next?: { slug: string; title: string };
  prev?: { slug: string; title: string };
}

const BlogLayout = ({ content, children, next, prev }: Props) => {
  const { frontmatter, readingTime } = content;

  return (
    <article>
      <header className="space-y-1 rounded-lg bg-cyan-700 px-2 py-4 text-center sm:py-6 md:py-10">
        <PageTitle>{frontmatter.title}</PageTitle>
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="flex flex-col justify-center font-medium text-base text-white leading-6 sm:flex-row sm:space-x-2">
            <div className="flex items-center justify-center space-x-2">
              {formatDate(frontmatter.date)}
            </div>
            <span className="hidden sm:block">-</span>
            <span>{readingTime.text}</span>
          </dd>
        </dl>
      </header>
      <div
        className="divide-y divide-gray-200 font-medium xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700"
        style={{ gridTemplateRows: 'auto 1fr' }}
      >
        <div className="divide-y divide-gray-200 xl:col-span-4 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
          <div className="prose dark:prose-dark max-w-none pt-8 pb-8">
            {children}
            <PostNavigation prev={prev} next={next} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogLayout;
