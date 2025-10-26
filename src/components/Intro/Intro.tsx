'use client';

import React, { useContext } from 'react';
import { ScrollContext } from '@/providers/ScrollProvider';
import { opacityForBlock } from './opacity';

const Intro = () => {
  const { scrollY } = useContext(ScrollContext);

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
      className="relative z-10 bg-white text-black dark:bg-gray-950 dark:text-white"
      id="intro"
    >
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-10 py-24 font-semibold text-4xl tracking-tight md:py-28 md:text-6xl lg:px-20 lg:py-3 lg:text-7xl">
        <div className="leading-[1.15]">
          <div
            className="mb-10 transition-opacity duration-300"
            style={{ opacity: opacityForBlock(progress, 0) }}
          >
            I am a dedicated and performance-driven Software Engineer.
          </div>
          <span
            className="mb-10 inline-block transition-opacity duration-300 after:content-['_']"
            style={{ opacity: opacityForBlock(progress, 1) }}
          >
            My expertise lies in building scalable and efficient backend systems that power seamless
            user experiences.
          </span>
          <span
            className="inline-block transition-opacity duration-300"
            style={{ opacity: opacityForBlock(progress, 2) }}
          >
            Currently, I am expanding my expertise in tools and platforms such as Nginx, Kubernetes,
            K9s, Terraform, and Ansible to enhance infrastructure automation and orchestration.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Intro;
