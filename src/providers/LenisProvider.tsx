'use client';

import { Lenis as ReactLenis } from '@studio-freight/react-lenis';
import type React from 'react';

interface Props {
  children: React.ReactNode;
}

const LenisProvider = ({ children }: Props) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

export default LenisProvider;
