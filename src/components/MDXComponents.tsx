import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import CustomLink from '@/components/Link';
import LinkButton from '@/components/LinkButton';
import Pre from '@/components/Pre';
import TableOfContentInline from '@/components/TableOfContentInline';
import type { BlogPost, MDXContent } from '@/lib/utils/mdx';
import type { TableOfContent, TableOfContentInlineProps } from '@/types/TableOfContent';

interface MDXLayout {
	content: BlogPost | MDXContent;
	toc?: TableOfContent;
	[key: string]: unknown;
}

const components: MDXComponents = {
	Image,
	TableOfContentInline,
	a: CustomLink,
	pre: Pre,
	LinkButton,
};

const MDXLayoutRenderer = ({ content, toc }: MDXLayout) => {
	// Enhanced components with access to TOC data
	const enhancedComponents: MDXComponents = {
		...components,
		TableOfContentInline: (props: TableOfContentInlineProps) => (
			<TableOfContentInline tableOfContentItems={content.toc || toc} {...props} />
		),
	};

	return (
		<MDXRemote
			source={content.content}
			components={enhancedComponents}
			options={{
				mdxOptions: {
					remarkPlugins: [remarkGfm],
					rehypePlugins: [rehypeSlug, rehypePrismPlus],
				},
			}}
		/>
	);
};

export default MDXLayoutRenderer;
