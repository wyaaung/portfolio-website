import type { Heading } from 'mdast';
import { toString as mdastToString } from 'mdast-util-to-string';
import { remark } from 'remark';
import type { Parent } from 'unist';
import { visit } from 'unist-util-visit';
import type { VFile } from 'vfile';

import type { TableOfContent } from '@/types/TableOfContent';

// Simple slug function that matches rehype-slug behavior
function createSlug(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '');
}

/**
 * Extracts TOC headings from markdown file and adds it to the file's data object.
 */
export function remarkTocHeadings() {
	return (tree: Parent, file: VFile) => {
		const toc: TableOfContent = [];
		const usedSlugs = new Set<string>();

		visit(tree, 'heading', (node: Heading) => {
			const textContent = mdastToString(node);
			const baseSlug = createSlug(textContent);
			let finalSlug = baseSlug;
			let counter = 1;

			// Handle duplicates by adding numbers
			while (usedSlugs.has(finalSlug)) {
				finalSlug = `${baseSlug}-${counter}`;
				counter++;
			}

			usedSlugs.add(finalSlug);

			toc.push({
				value: textContent,
				url: `#${finalSlug}`,
				depth: node.depth,
			});
		});
		file.data.toc = toc;
	};
}

/**
 * Passes markdown file through remark to extract TOC headings
 *
 * @param {string} markdown
 * @return {*}  {Promise<Toc>}
 */
export async function extractTocHeadings(markdown: string): Promise<TableOfContent> {
	const vfile = await remark().use(remarkTocHeadings).process(markdown);
	// @ts-expect-error  Can Be Nullable
	return vfile.data.toc;
}
