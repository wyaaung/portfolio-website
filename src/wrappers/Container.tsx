'use client';

import type React from 'react';

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return <div className="mx-auto max-w-3xl px-4 sm:px-9 xl:max-w-5xl xl:px-0">{children}</div>;
};

export default Container;
