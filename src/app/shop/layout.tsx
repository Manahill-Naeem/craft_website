// frontend/src/app/shop/layout.tsx
// This is a Server Component by default, perfect for metadata export.
import React from 'react'; // Explicitly import React for ReactNode

export const metadata = {
  title: "Shop All - Crafted Whispers: Handcrafted Wedding Essentials, Pearl & Crystal Collections",
  description: "Explore the full collection of handcrafted gifts from Crafted Whispers. Discover exquisite wedding essentials, unique pearl jewelry, sparkling crystal decorations, and beautiful bespoke bouquets, all handmade with love in Pakistan.",
  keywords: "shop Crafted Whispers, handmade gifts, wedding essentials, pearl collection, crystal collection, custom bouquets, bridal accessories, unique gifts, artisan crafts Pakistan, online shop, gifts for special occasions",
  // Optional: add Open Graph, Twitter cards, etc.
  openGraph: {
    title: 'Shop All - Crafted Whispers',
    description: 'Explore unique handcrafted gifts.',
    url: 'https://www.yourwebsite.com/shop', // Replace with your actual domain
    siteName: 'Crafted Whispers',
    images: [
      {
        url: 'https://www.yourwebsite.com/og-image.jpg', // Replace with a relevant image
        width: 800,
        height: 600,
        alt: 'Crafted Whispers Shop',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.yourwebsite.com/shop', // Replace with your actual domain
  },
};

export default function ShopLayout({
  children, // This prop will be the `page.tsx` component
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children} {/* This will render your `page.tsx` */}
    </>
  );
}
