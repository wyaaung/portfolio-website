import type React from 'react';

interface Props {
	children: React.ReactNode;
}

const PageTitle = ({ children }: Props) => {
	return (
		<h1 className='font-extrabold text-2xl text-white leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14'>
			{children}
		</h1>
	);
};

export default PageTitle;
