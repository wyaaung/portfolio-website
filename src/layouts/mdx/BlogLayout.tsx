import React from 'react';
import { CoreContent } from '@/lib/utils/contentlayer';
import { Blog } from 'contentlayer/generated';
import PageTitle from '@/components/blog/PageTitle';
import { siteMetaData } from '@/data/siteMetaData';

const postDateTemplate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface Props {
  content: CoreContent<Blog>;
  children: React.ReactNode;
  next?: { slug: string; title: string };
  prev?: { slug: string; title: string };
}

const BlogLayout = ({ content, children, next, prev }: Props) => {
  const { date, title, readingTime } = content;

  return (
    <article>
      <header className="space-y-1 rounded-lg bg-cyan-500 py-4 px-2 text-center sm:py-6 md:py-10">
        <PageTitle>{title}</PageTitle>
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="flex flex-col justify-center text-base font-medium leading-6 text-white sm:flex-row sm:space-x-2">
            <div className="flex items-center justify-center space-x-2">
              <time dateTime={date}>
                {`${new Date(date).toLocaleDateString(siteMetaData.locale, postDateTemplate)}`}
              </time>
            </div>
            <span className="hidden sm:block">-</span>
            <span>{readingTime.text}</span>
          </dd>
        </dl>
      </header>
    </article>
  );
};

export default BlogLayout;
