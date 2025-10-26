'use client';

import Lenis from 'lenis';
import type React from 'react';
import { useEffect } from 'react';

interface Props {
	children: React.ReactNode;
}

const LenisProvider = ({ children }: Props) => {
	useEffect(() => {
		const lenis = new Lenis();

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	}, []);

	return <>{children}</>;
};

export default LenisProvider;
