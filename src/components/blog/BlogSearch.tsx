import React from 'react';

interface Props {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const BlogSearch = ({ setSearchValue }: Props) => {
  return (
    <div className="relative max-w-full">
      <input
        aria-label="Search Blogs"
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search Blogs"
        className="block w-full rounded-md border-0 bg-gray-200 bg-opacity-50 px-4 py-3 text-gray-900 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
      />
      <svg
        className="absolute right-3 top-3 h-6 w-6 text-gray-400 dark:text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default BlogSearch;
