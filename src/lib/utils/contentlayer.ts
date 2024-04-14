import type { DocumentTypes } from 'contentlayer/generated';

export const omit = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): Omit<Obj, Keys> => {
  const result = Object.assign({}, obj);
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
};

export function coreContent<T extends DocumentTypes>(content: T) {
  return omit(content, ['body', '_raw', '_id']);
}
