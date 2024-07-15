'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { BsSearch } from 'react-icons/bs';

const SearchButton = () => {
  const [mounted, setMounted] = React.useState(false);

  // When mounted on client, now we can show the UI
  React.useEffect(() => setMounted(true), []);
  return (
    <motion.button
      aria-label="Search Button"
      type="button"
      className="ml-1 mr-1 h-8 w-8 rounded p-1"
      whileHover={{ scale: 1.2 }}
      onClick={() => console.log('Search Button')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
        className="text-gray-900 dark:text-gray-100"
      >
        {mounted && <BsSearch size={16} />}
      </svg>
    </motion.button>
  );
};

export default SearchButton;
