import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Font example.
import 'antd/dist/reset.css'; // AntD CSS reset.

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
        className={inter.className}
        style={{
          margin: 0,
          backgroundColor: '#f5f5f5', // Light gray background as common in Figma designs
          minHeight: '100vh',
        }}
      >
        {children}
      </body>
    </html>
  );
}
