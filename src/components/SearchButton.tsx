'use client';

import { useKBar } from 'kbar';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

const SearchButton = () => {
	const [mounted, setMounted] = React.useState(false);
	const { query } = useKBar();

	// When mounted on client, now we can show the UI
	React.useEffect(() => setMounted(true), []);
	return (
		<motion.button
			aria-label='Search Button'
			type='button'
			className='mr-1 ml-1 h-8 w-8 rounded p-1'
			whileHover={{ scale: 1.2 }}
			onClick={() => query.toggle()}
		>
			{mounted && <Search size={24} />}
		</motion.button>
	);
};

export default SearchButton;
