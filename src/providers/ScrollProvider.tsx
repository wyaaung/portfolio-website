'use client';

import Lenis from 'lenis';
import React, { useEffect } from 'react';

interface ScrollValue {
	scrollY: number;
}

interface ScrollProviderProps {
	children: React.ReactNode;
}

export const ScrollContext = React.createContext<ScrollValue>({ scrollY: 0 });

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
	const [scrollY, setScrollY] = React.useState(0);

	useEffect(() => {
		const lenis = new Lenis();

		lenis.on('scroll', ({ scroll }: { scroll: number }) => {
			setScrollY(scroll);
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	}, []);

	return <ScrollContext.Provider value={{ scrollY }}>{children}</ScrollContext.Provider>;
};
