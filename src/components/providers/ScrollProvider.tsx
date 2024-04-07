'use client';

import { useLenis } from '@studio-freight/react-lenis';
import React from 'react';

interface ScrollValue {
  scrollY: number;
}

interface ScrollProviderProps {
  children: React.ReactNode;
}

export const ScrollContext = React.createContext<ScrollValue>({ scrollY: 0 });

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const [scrollY, setScrollY] = React.useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useLenis(({ scroll }: any) => {
    setScrollY(scroll);
  });

  return <ScrollContext.Provider value={{ scrollY }}>{children}</ScrollContext.Provider>;
};
