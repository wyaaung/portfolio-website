'use client';

import Link from 'next/link';
import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

import LinkButton from './LinkButton';

const CustomLink = ({
  href,
  ...rest
}: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
  const isInternalLink = href?.startsWith('/');
  const isAnchorLink = href?.startsWith('#');

  if (isInternalLink && href) {
    return (
      <Link href={href} {...rest}>
        {rest.children}
      </Link>
    );
  }

  if (isAnchorLink) {
    return <LinkButton href={href} {...rest} />;
  }

  return <LinkButton target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};

export default CustomLink;
