'use client';

import { useLenis } from '@studio-freight/react-lenis';
import React from 'react';
import { opacityForBlock } from './opacity';

const Intro = () => {
  const [scrollY, setScrollY] = React.useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useLenis(({ scroll }: any) => {
    setScrollY(scroll);
  });

  const introRef = React.useRef<HTMLDivElement>(null);
  const numberOfLines = 4;
  let progress = 0;
  const { current: elContainer } = introRef;

  if (elContainer) {
    const { clientHeight, offsetTop } = elContainer;
    const screenH = window.innerHeight;
    const halfH = screenH / 2;

    const percentY =
      Math.min(clientHeight + halfH, Math.max(-screenH, scrollY - offsetTop) + halfH) /
      clientHeight;

    progress = Math.min(numberOfLines - 0.5, Math.max(0.5, percentY * numberOfLines));
  }

  return (
    <div
      ref={introRef}
      className="relative z-10 bg-white text-black dark:bg-black  dark:text-white"
      id="intro"
    >
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-10 py-24 text-4xl font-semibold tracking-tight md:py-28 md:text-6xl lg:px-20 lg:py-3 lg:text-7xl">
        <div className="leading-[1.15]">
          <div
            className="transition-opacity duration-300"
            style={{ opacity: opacityForBlock(progress, 0) }}
          >
            I have a keen interest in exploring new technologies.
          </div>
          <span
            className="transition-opacity duration-300 inline-block after:content-['_']"
            style={{ opacity: opacityForBlock(progress, 1) }}
          >
            I have a keen interest in exploring new technologies.
          </span>
          <span
            className="transition-opacity duration-300 inline-block after:content-['_']"
            style={{ opacity: opacityForBlock(progress, 2) }}
          >
            I have a keen interest in exploring new technologies.
          </span>
          <span
            className="transition-opacity duration-300 inline-block"
            style={{ opacity: opacityForBlock(progress, 3) }}
          >
            I have a keen interest in exploring new technologies.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Intro;
