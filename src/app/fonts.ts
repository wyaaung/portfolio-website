import { Roboto } from 'next/font/google';

export const roboto = Roboto({
	weight: ['200', '300', '400', '500', '600', '700'],
	variable: '--font-roboto',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
});
