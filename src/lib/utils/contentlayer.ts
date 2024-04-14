import type { Blog, DocumentTypes } from 'contentlayer/generated';

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export function sortedBlogPost(allBlogs: Blog[]) {
  return allBlogs.sort((a, b) => dateSortDesc(a.date, b.date)).filter((p) => p.draft === false);
}

export const omit = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): Omit<Obj, Keys> => {
  const result = Object.assign({}, obj);
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
};

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>;

export function coreContent<T extends DocumentTypes>(content: T) {
  return omit(content, ['body', '_raw', '_id']);
}
