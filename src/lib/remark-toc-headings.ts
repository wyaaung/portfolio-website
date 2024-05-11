import GithubSlugger from 'github-slugger';
import { Heading } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { remark } from 'remark';
import { TableOfContent } from '@/types/TableOfContent';
import { Parent } from 'unist';
import { visit } from 'unist-util-visit';
import { VFile } from 'vfile';

const slugger = new GithubSlugger();

/**
 * Extracts TOC headings from markdown file and adds it to the file's data object.
 */
export function remarkTocHeadings() {
  return (tree: Parent, file: VFile) => {
    const toc: TableOfContent = [];
    visit(tree, 'heading', (node: Heading) => {
      const textContent = toString(node);
      toc.push({
        value: textContent,
        url: '#' + slugger.slug(textContent),
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
