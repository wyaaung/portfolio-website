import { Author, Blog } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import { coreContent } from '@/lib/utils/contentlayer';
import { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import TableOfContentInline from '@/components/TableOfContentInline';
import CustomLink from '@/components/Link';
import Pre from '@/components/Pre';
import LinkButton from '@/components/LinkButton';

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
