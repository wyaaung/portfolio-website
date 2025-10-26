import { slug } from 'github-slugger';
import Link from 'next/link';

interface Props {
  tags: string[];
  tagCounts: Record<string, number>;
  pathname: string;
}

const TagList = ({ tags, tagCounts, pathname }: Props) => {
  return (
    <ul>
      {tags.sort().map((tag) => {
        return (
          <li key={tag} className="my-3">
            {pathname.split('/tags/')[1] === slug(tag) ? (
              <h3 className="inline px-3 py-2 font-bold text-cyan-500 text-sm uppercase">
                {`${tag} (${tagCounts[tag]})`}
              </h3>
            ) : (
              <Link
                href={`/tags/${slug(tag)}`}
                className="px-3 py-2 font-medium text-gray-500 text-sm uppercase hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-500"
                aria-label={`View blogs tagged ${tag}`}
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
