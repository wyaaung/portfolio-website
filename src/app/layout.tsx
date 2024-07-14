import type { Metadata } from 'next';
import '@/css/prism.css';
import '@/css/tailwind.css';
import { siteMetaData } from '@/data/siteMetaData';
import ThemeProvider from '@/providers/ThemeProvider';
import { Header } from '@/components/Navigation/Header';
import LenisProvider from '@/providers/LenisProvider';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';

export const metadata: Metadata = {
  title: siteMetaData.title,
  description: siteMetaData.description,
  metadataBase: new URL('https://wyaaung.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteMetaData.language} suppressHydrationWarning>
      <link rel="apple-touch-icon" sizes="76x76" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <LenisProvider>
            <main>{children}</main>
          </LenisProvider>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
