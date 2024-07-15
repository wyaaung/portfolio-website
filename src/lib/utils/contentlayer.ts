import type { Blog } from 'contentlayer/generated';
import type { Document, MDX } from 'contentlayer2/core';
import { slug } from 'github-slugger';

const isProduction = process.env.NODE_ENV === 'production';

export type MDXDocument = Document & { body: MDX };
export type MDXDocumentDate = MDXDocument & {
  date: string;
};

export type MDXBlog = MDXDocumentDate & {
  tags?: string[];
  draft?: boolean;
};

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

/**
 * Sorts a list of MDX documents by date in descending order
 *
 * @param {MDXDocumentDate[]} allBlogs
 * @param {string} [dateKey='date']
 * @return {*}
 */
export function sortBlogs<T extends MDXDocumentDate>(allBlogs: T[], dateKey = 'date') {
  return allBlogs.sort((a, b) => dateSortDesc(a[dateKey], b[dateKey]));
}

/**
 * A typesafe omit helper function
 * @example omit(content, ['body', '_raw', '_id'])
 *
 * @param {Obj} obj
 * @param {Keys[]} keys
 * @return {*}  {Omit<Obj, Keys>}
 */
export const omit = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): Omit<Obj, Keys> => {
  const result = Object.assign({}, obj);
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
};

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>;

/**
 * Omit body, _raw, _id from MDX document and return only the core content
 *
 * @param {T} content
 * @return {*}  {CoreContent<T>}
 */
export function coreContent<T extends MDXDocument>(content: T): CoreContent<T> {
  return omit(content, ['body', '_raw', '_id']);
}

/**
 * Omit body, _raw, _id from a list of MDX documents and returns only the core content
 * If `NODE_ENV` === "production", it will also filter out any documents with draft: true.
 *
 * @param {T[]} contents
 * @return {*}  {CoreContent<T>[]}
 */
export function allCoreContent<T extends MDXDocument>(contents: T[]): CoreContent<T>[] {
  if (isProduction)
    return contents.map((c) => coreContent(c)).filter((c) => !('draft' in c && c.draft === true));
  return contents.map((c) => coreContent(c));
}

export function getAllTags(allBlogs: Blog[]): Record<string, number> {
  return allBlogs.reduce((tagCount: Record<string, number>, { tags, draft }) => {
    if (tags && !draft) {
      tags.forEach((tag) => {
        const formattedTag = slug(tag);
        tagCount[formattedTag] = (tagCount[formattedTag] || 0) + 1;
      });
    }
    return tagCount;
  }, {});
}
