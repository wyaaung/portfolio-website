'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import headerNavigationLinks from '@/data/headerNavigationLinks';

const MobileNavigation = () => {
  const pathName = usePathname();
  const [navigationShown, setNavigationShown] = React.useState(false);

  const variants = {
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100vw' },
  };

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="mr-1 ml-1 h-10 w-10 rounded p-1"
        aria-label="Toggle Menu"
        onClick={() => setNavigationShown((previous) => !previous)}
      >
        <Menu className="text-gray-900 dark:text-gray-100" size={24} />
      </button>
      <AnimatePresence>
        <motion.div
          key="MobileNavigation"
          className="fixed inset-0 z-20 h-full w-full bg-white opacity-95 dark:bg-black"
          animate={navigationShown ? 'enter' : 'exit'}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          initial="exit"
          exit="exit"
          variants={variants}
        >
          <header className="flex justify-end p-5">
            <button
              type="button"
              aria-label="Toggle modal"
              className="h-8 w-8 rounded"
              onClick={() => setNavigationShown((previous) => !previous)}
            >
              <X className="text-gray-900 dark:text-gray-100" size={24} />
            </button>
          </header>
          <nav className="fixed mt-8 h-full">
            <div key="Home" className="px-12 py-4">
              <Link
                href="/"
                onClick={() => setNavigationShown((previous) => !previous)}
                className={`horizontal-underline font-bold text-gray-900 tracking-widest backdrop:text-2xl dark:text-gray-100 ${
                  pathName === '/' ? 'horizontal-underline-active' : ''
                }`}
              >
                Home
              </Link>
            </div>
            {headerNavigationLinks.map(({ href, title }) => {
              const active = pathName?.includes(href);
              return (
                <div key={title} className="px-12 py-4">
                  <Link
                    href={href}
                    onClick={() => setNavigationShown((previous) => !previous)}
                    className={`horizontal-underline font-bold text-gray-900 tracking-widest backdrop:text-2xl dark:text-gray-100 ${
                      active ? 'horizontal-underline-active' : ''
                    }`}
                  >
                    {title}
                  </Link>
                </div>
              );
            })}
          </nav>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MobileNavigation;
