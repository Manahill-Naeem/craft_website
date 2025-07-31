// frontend/src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter font from next/font
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/cartcontext';
import React from 'react'; // Explicitly import React for ReactNode

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crafted Whispers: Handcrafted Wedding Essentials, Pearl & Crystal Collections',
  description: 'Discover exquisite handcrafted gifts, wedding essentials, unique pearl jewelry, sparkling crystal decorations, and beautiful bespoke bouquets. Handmade with love in Pakistan.',
  keywords: 'Crafted Whispers, handmade gifts, wedding essentials, pearl collection, crystal collection, custom bouquets, bridal accessories, unique gifts, artisan crafts Pakistan, online shop, gifts for special occasions',
  openGraph: {
    title: 'Crafted Whispers',
    description: 'Handcrafted Wedding Essentials, Pearl & Crystal Collections',
    url: 'https://www.yourwebsite.com', /git add 
    siteName: 'Crafted Whispers',
    images: [
      {
        url: 'https://www.yourwebsite.com/og-image.jpg', // Replace with a relevant image
        width: 1200,
        height: 630,
        alt: 'Crafted Whispers Homepage',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crafted Whispers',
    description: 'Handcrafted Wedding Essentials, Pearl & Crystal Collections',
    images: ['https://www.yourwebsite.com/twitter-image.jpg'], // Replace with a relevant image
  },
  // Adding a canonical URL for the base site
  alternates: {
    canonical: 'https://www.yourwebsite.com', // Replace with your actual domain
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
