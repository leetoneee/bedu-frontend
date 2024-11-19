import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import '../styles/globals.css';
import { NUIProviders } from '@/providers';

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'BEDU - BEducation',
  description: 'An English Center System Management',
  icons: 'icons/logo.svg'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <NUIProviders>{children}</NUIProviders>
      </body>
    </html>
  );
}
