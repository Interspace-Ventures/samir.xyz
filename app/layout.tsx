import './globals.css';
import type { Metadata } from 'next';
import { Alexandria } from 'next/font/google';
import Providers from './providers';
import Navigation from './components/navigation';
import Footer from './components/footer';

const alexandria = Alexandria({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Interspace Ventures',
  description: 'A minimal portfolio website showcasing Interspace Ventures investments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${alexandria.className} bg-bg-primary text-text-primary flex flex-col min-h-screen`}>
        <Providers>
          <Navigation />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}