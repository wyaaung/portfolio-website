import Image from 'next/image';
import type React from 'react';
import type { AuthorFrontmatter, CoreContent, MDXContent } from '@/lib/utils/mdx';

interface Props {
  children: React.ReactNode;
  content: CoreContent<MDXContent>;
}

const AuthorLayout = ({ children, content }: Props) => {
  const { frontmatter } = content;
  const { avatar, occupation, company } = frontmatter as AuthorFrontmatter;

  return (
    <div className="pt-8">
      <div className="mb-8 flex flex-col-reverse items-center justify-between sm:flex-row sm:items-center">
        <div className="mt-2 text-center sm:mt-0 sm:text-left">
          <h1 className="font-bold text-xl md:text-3xl lg:text-4xl">William (Wai Yan) Aung</h1>
          <h2 className="font-normal text-sm md:text-base">
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
      <div className="prose dark:prose-dark max-w-none pb-8 text-justify text-sm leading-6 md:text-lg md:leading-8 xl:col-span-2">
        {children}
      </div>
    </div>
  );
};

export default AuthorLayout;
