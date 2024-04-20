import type { Document, MDX } from 'contentlayer2/core';

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
export function sortBlogs<T extends MDXDocumentDate>(allBlogs: T[], dateKey: string = 'date') {
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
