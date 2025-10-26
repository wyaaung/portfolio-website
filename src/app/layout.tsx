import '@/css/prism.css';
import '@/css/tailwind.css';

import type { Metadata } from 'next';

import Analytics from '@/components/Analytics';
import Footer from '@/components/Footer';
import { Header } from '@/components/Navigation/Header';
import { siteMetaData } from '@/data/siteMetaData';
import { KBarSearchProvider } from '@/lib/search/kbar';
import LenisProvider from '@/providers/LenisProvider';
import ThemeProvider from '@/providers/ThemeProvider';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wyaaung.vercel.app';

export const metadata: Metadata = {
  title: {
    default: siteMetaData.title,
    template: `%s - ${siteMetaData.title}`,
  },
  description: siteMetaData.description,
  keywords: [
    siteMetaData.author,
    'Software Engineer',
    'Portfolio',
    'Blog',
    'Tech Blog',
    'Web Development',
    'Programming',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'CSS',
    'Tailwind CSS',
    'Java',
    'Spring',
    'Docker',
    'Kubernetes',
    'AWS',
  ].join(', '),
  authors: [{ name: siteMetaData.author, url: baseUrl }],
  creator: siteMetaData.author,
  publisher: siteMetaData.author,
  metadataBase: new URL(baseUrl),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
    types: {
      'application/rss+xml': `${baseUrl}/feed.xml`,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const basePath = process.env.BASE_PATH || '';
  return (
    <html lang={siteMetaData.language} suppressHydrationWarning>
      <link rel="apple-touch-icon" sizes="76x76" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <KBarSearchProvider
            kbarConfig={{ searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json` }}
          >
            <Header />
            <LenisProvider>
              <main>{children}</main>
            </LenisProvider>
            <Footer />
          </KBarSearchProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
