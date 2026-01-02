import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'antd/dist/reset.css';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movie Search App',
  description: 'App for searching movies',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} m-0 bg-gray-100 min-h-screen`} // Tailwind: m-0 (margin:0), bg-gray-100 (#f5f5f5), min-h-screen
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
