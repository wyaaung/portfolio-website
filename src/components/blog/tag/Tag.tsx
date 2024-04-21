// import kebabCase from '@/lib/utils/kebabCase';
import { slug } from 'github-slugger';
import Link from 'next/link';

interface Props {
  text: string;
}

export default function Tag({ text }: Props) {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 text-sm font-medium uppercase text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400"
    >
      {text.split(' ').join('-')}
    </Link>
  );
}
