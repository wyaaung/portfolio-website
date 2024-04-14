// import type { Metadata } from 'next';
// import { Space_Grotesk } from 'next/font/google';
import { siteMetaData } from '@/data/siteMetaData';
import '@/css/tailwind.css';
import ThemeProvider from '@/providers/ThemeProvider';
import { Header } from '@/components/Header';
import LenisProvider from '@/providers/LenisProvider';
import Footer from '@/components/Footer';

// const space_grotesk = Space_Grotesk({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-space-grotesk',
// });

// export const metadata: Metadata = {
//   title: siteMetaData.title,
// };

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
      <body className="bg-white text-black antialiased dark:bg-black dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Header />
          <LenisProvider>
            <main>{children}</main>
          </LenisProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
