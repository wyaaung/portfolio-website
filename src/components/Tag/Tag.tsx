import { slug } from 'github-slugger';
import Link from 'next/link';

interface Props {
	text: string;
}

export default function Tag({ text }: Props) {
	return (
		<Link
			href={`/tags/${slug(text)}`}
			className='mr-3 font-medium text-cyan-500 text-sm uppercase hover:text-cyan-600 dark:text-cyan-500 dark:hover:text-cyan-400'
		>
			{text.split(' ').join('-')}
		</Link>
	);
}
