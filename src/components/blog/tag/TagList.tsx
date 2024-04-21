import { slug } from 'github-slugger';
import Link from 'next/link';
import React from 'react';

interface Props {
  tags: string[];
  tagCounts: Record<string, number>;
  pathname: string;
}

const TagList = ({ tags, tagCounts, pathname }: Props) => {
  return (
    <ul>
      {tags.map((tag) => {
        return (
          <li key={tag} className="my-3">
            {pathname.split('/tags/')[1] === slug(tag) ? (
              <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-cyan-500">
                {`${tag} (${tagCounts[tag]})`}
              </h3>
            ) : (
              <Link
                href={`/tags/${slug(tag)}`}
                className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-500"
                aria-label={`View posts tagged ${tag}`}
              >
                {`${tag} (${tagCounts[tag]})`}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TagList;
