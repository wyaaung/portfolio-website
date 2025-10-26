import type React from 'react';

const LinkButton = ({
	href,
	...rest
}: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
	return (
		<a
			className='cursor-pointer bg-gradient-to-r from-cyan-500 to-cyan-500 bg-no-repeat no-underline [background-position:0_100%] [background-size:100%_0.2em] hover:text-white motion-safe:transition-all motion-safe:duration-300 dark:from-cyan-500 dark:to-cyan-500 hover:[background-size:100%_100%] focus:[background-size:100%_100%]'
			href={href}
			{...rest}
		/>
	);
};

export default LinkButton;
