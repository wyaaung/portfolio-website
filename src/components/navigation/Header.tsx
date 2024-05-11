'use client';

import Link from 'next/link';
import headerNavigationLinks from '@/data/headerNavigationLinks';
import { usePathname } from 'next/navigation';
import ThemeSwitch from '@/components/ThemeSwitch';
import MobileNavigation from '@/components/Navigation/MobileNavigation';
import Container from '@/wrappers/Container';

export const Header = () => {
  const pathName = usePathname();

  return (
    <Container>
      <header className="z-40 bg-transparent py-5 md:py-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <Link
              href="/"
              className={`horizontal-underline hidden text-3xl font-extrabold sm:block ${
                pathName === '/' ? 'horizontal-underline-active' : ''
              }`}
              aria-label="W."
            >
              W.
            </Link>
          </div>
          <div className="flex items-center space-x-3 text-base leading-5">
            <div className="hidden space-x-5 sm:flex">
              {headerNavigationLinks.map(({ title, href }) => {
                const active = pathName?.includes(href);
                return (
                  <Link
                    prefetch
                    key={title}
                    href={href}
                    aria-label={title}
                    className={`horizontal-underline text-base ${
                      active ? 'horizontal-underline-active' : ''
                    }`}
                  >
                    <span className="font-semibold tracking-wide text-gray-900 dark:text-gray-100">
                      {title}
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center">
              <ThemeSwitch />
              <MobileNavigation />
            </div>
          </div>
        </div>
      </header>
    </Container>
  );
};
