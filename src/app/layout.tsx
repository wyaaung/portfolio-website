import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { siteMetaData } from '@/data/siteMetaData';
import '@/css/tailwind.css';

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: siteMetaData.title,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteMetaData.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#FFFFFF"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#000000"
      />
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        {children}
      </body>
    </html>
  );
}
