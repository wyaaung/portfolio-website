import React from 'react';
import Image from 'next/image';
import type { Author } from 'contentlayer/generated';

interface Props {
  children: React.ReactNode;
  content: Omit<Author, '_id' | '_raw' | 'body'>;
}

const AuthorLayout = ({ children, content }: Props) => {
  const { avatar, occupation, company } = content;

  return (
    <div className="pt-8">
      <div className="mb-8 flex flex-col-reverse items-center justify-between sm:flex-row sm:items-center">
        <div className="text-center sm:text-left">
          <h1 className="text-xl font-bold md:text-3xl lg:text-4xl">William (Wai Yan) Aung</h1>
          <h2 className="text-sm font-normal md:text-base">
            {occupation} at <span className="font-semibold">{company}</span>
          </h2>
        </div>
        <div>
          <Image
            alt="William (Wai Yan) Aung"
            height={130}
            width={130}
            src={avatar || ''}
            className="rounded-full object-scale-down grayscale-0"
          />
        </div>
      </div>
      <div className="prose max-w-none pb-8 text-justify text-sm dark:prose-dark md:text-lg xl:col-span-2">
        {children}
      </div>
    </div>
  );
};

export default AuthorLayout;
