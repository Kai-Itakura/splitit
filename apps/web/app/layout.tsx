import { Toaster } from '@repo/ui/components';
import '@repo/ui/globals.css';
import type { Metadata } from 'next';
import { M_PLUS_2 } from 'next/font/google';

const mPlus2 = M_PLUS_2({
  weight: '400',
  variable: '--font-m-plus-2',
  subsets: ['latin-ext'],
});

export const metadata: Metadata = {
  title: 'SplitIt',
  description: 'Dutch Treat Application.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen ${mPlus2.variable}  font-m-plus-2 antialiased bg-gray-50`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
