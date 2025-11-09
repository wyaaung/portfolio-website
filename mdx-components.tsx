import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

import CustomLink from '@/components/Link';
import LinkButton from '@/components/LinkButton';
import Pre from '@/components/Pre';
import TableOfContentInline from '@/components/TableOfContentInline';

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		Image,
		TableOfContentInline,
		a: CustomLink,
		pre: Pre,
		LinkButton,
		...components,
	};
}
