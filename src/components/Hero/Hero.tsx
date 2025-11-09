'use client';

import { ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { renderCanvas } from './renderCanvas';

const Hero = () => {
	const ref = useRef<HTMLHeadingElement>(null);

	let progress = 0;
	const { current: elContainer } = ref;

	if (elContainer) {
		progress = Math.min(1, scrollY / elContainer.clientHeight);
	}

	useEffect(() => {
		renderCanvas();
	}, []);

	return (
		<div>
			<h1 className='sr-only'>Hello I am William (Wai Yan) Aung, and am a Software Engineer.</h1>
			<div className='relative z-10 flex h-[calc(100vh-81px)] items-center md:h-[calc(100vh-116px)]'>
				<div className='mx-auto w-screen max-w-3xl px-4 sm:px-9 xl:max-w-5xl xl:px-0'>
					<div className='-mt-36'>
						<div ref={ref} className='flex cursor-default flex-col space-y-2'>
							<h1 className='font-semibold text-4xl sm:text-6xl md:text-7xl xl:text-8xl'>
								William (Wai Yan) Aung
							</h1>
							<h2 className='font-medium text-2xl opacity-80 sm:text-5xl md:text-5xl xl:text-6xl'>
								Software Engineer
							</h2>
							<Link
								href='/about'
								className='underline-magical w-max cursor-pointer text-sm sm:text-base md:text-lg xl:text-xl'
							>
								Read more about me &rarr;
							</Link>
						</div>
						<motion.div
							animate={{
								transform: `translateY(${progress * 10}vh)`,
							}}
							className='-translate-x-1/2 absolute bottom-4 left-1/2 transform md:bottom-8'
						>
							<button
								type='button'
								className='flex cursor-pointer flex-col items-center justify-center'
								onClick={() => {
									const intro = document.querySelector('#intro');

									intro?.scrollIntoView({ behavior: 'smooth' });
								}}
								aria-label='Scroll to introduction'
							>
								<ArrowDown size={24} />
							</button>
						</motion.div>
					</div>
				</div>
			</div>
			<canvas
				className='pointer-events-none absolute inset-0 w-full bg-skin-base'
				id='canvas'
			></canvas>
		</div>
	);
};

export default Hero;
