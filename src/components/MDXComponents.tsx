import type { Author, Blog } from 'contentlayer/generated';
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer2/hooks';

import CustomLink from '@/components/Link';
import LinkButton from '@/components/LinkButton';
import Pre from '@/components/Pre';
import TableOfContentInline from '@/components/TableOfContentInline';
import { coreContent } from '@/lib/utils/contentlayer';

interface MDXLayout {
  content: Blog | Author;
  [key: string]: unknown;
}

const components: MDXComponents = {
  Image,
  TableOfContentInline,
  a: CustomLink,
  pre: Pre,
  LinkButton,
};

const MDXLayoutRenderer = ({ content, ...rest }: MDXLayout) => {
  const MDXLayout = useMDXComponent(content.body.code);
  const mainContent = coreContent(content);

  return <MDXLayout content={mainContent} components={components} {...rest} />;
};

export default MDXLayoutRenderer;
