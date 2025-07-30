// frontend/src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#7A4E7A] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="col-span-1">
          <h3 className="text-xl font-bold text-gold mb-4">Crafted Whispers</h3>
          <p className="text-sm text-gray-300">
            Handcrafted wedding essentials, pearl & crystal collections, and bespoke bouquets. Made with love in Pakistan.
          </p>
          <div className="flex space-x-4 mt-4">
            {/* Social Media Icons - Replace with actual links */}
            <a href="#" className="text-gray-300 hover:text-gold transition-colors">
              {/* Example SVG for Facebook */}
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-gold transition-colors">
              {/* Example SVG for Instagram */}
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.715.01 3.657.042 1.028.038 1.765.247 2.312.469.63.26 1.166.603 1.696 1.134.53.53.873 1.065 1.134 1.696.222.547.43 1.284.469 2.312.032.942.042 1.227.042 3.657 0 2.43-.01 2.715-.042 3.657-.038 1.028-.247 1.765-.469 2.312-.26.63-.603 1.166-1.134 1.696-.53.53-.873.873-1.696 1.134-.547.222-1.284.43-2.312.469-.942.032-1.227.042-3.657.042s-2.715-.01-3.657-.042c-1.028-.038-1.765-.247-2.312-.469-.63-.26-1.166-.603-1.696-1.134-.53-.53-.873-.873-1.134-1.696-.222-.547-.43-1.284-.469-2.312-.032-.942-.042-1.227-.042-3.657s.01-2.715.042-3.657c.038-1.028.247-1.765.469-2.312.26-.63.603-1.166 1.134-1.696.53-.53.873-.873 1.696-1.134.547-.222 1.284-.43 2.312-.469.942-.032 1.227-.042 3.657-.042zm0 2.16c-2.726 0-3.056.01-4.124.05-.781.03-1.28.16-1.653.303-.358.145-.664.34-.95.626-.286.286-.48.592-.626.95-.143.373-.273.872-.303 1.653-.041 1.068-.05 1.398-.05 4.124s.01 3.057.05 4.124c.03 1.068.16 1.78.303 2.152.145.358.34.664.626.95.286.286.592.48.95.626.373.143.872.273 1.653.303 1.067.04 1.397.05 4.124.05s3.057-.01 4.124-.05c.78-.03 1.28-.16 1.653-.303.358-.145.664-.34.95-.626.287-.286.48-.592.626-.95.143-.373.273-.872.303-1.653.04-1.067.05-1.397.05-4.124s-.01-3.057-.05-4.124c-.03-1.068-.16-1.78-.303-2.152-.145-.358-.34-.664-.626-.95-.287-.286-.592-.48-.95-.626-.373-.143-.872-.273-1.653-.303-1.067-.04-1.397-.05-4.124-.05zm0 6.827c-1.797 0-3.26-1.463-3.26-3.26s1.463-3.26 3.26-3.26 3.26 1.463 3.26 3.26-1.463 3.26-3.26 3.26zm2.036-3.26c0 .791-.641 1.432-1.432 1.432-.791 0-1.432-.641-1.432-1.432s.641-1.432 1.432-1.432 1.432.641 1.432 1.432zm-1.432-5.462a1.26 1.26 0 1 1 0 2.52 1.26 1.26 0 0 1 0-2.52z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h3 className="text-xl font-bold text-gold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/shop" className="text-gray-300 hover:text-gold transition-colors">Shop All</Link></li>
            <li><Link href="/custom-orders" className="text-gray-300 hover:text-gold transition-colors">Custom Orders</Link></li>
            <li><Link href="/our-story" className="text-gray-300 hover:text-gold transition-colors">Our Story</Link></li>
            <li><Link href="/faq" className="text-gray-300 hover:text-gold transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="col-span-1">
          <h3 className="text-xl font-bold text-gold mb-4">Categories</h3>
          <ul className="space-y-2">
            <li><Link href="/shop?category=wedding-essentials" className="text-gray-300 hover:text-gold transition-colors">Wedding Essentials</Link></li>
            <li><Link href="/shop?category=pearl-collection" className="text-gray-300 hover:text-gold transition-colors">Pearl Collection</Link></li>
            <li><Link href="/shop?category=crystal-collection" className="text-gray-300 hover:text-gold transition-colors">Crystal Collection</Link></li>
            <li><Link href="/shop?category=bouquet-collection" className="text-gray-300 hover:text-gold transition-colors">Bouquet Collection</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="col-span-1">
          <h3 className="text-xl font-bold text-gold mb-4">Get in Touch</h3>
          <p className="text-sm text-gray-300">
            Email: craftedwhispers34@gmail.com<br />
            Phone: +92 3180305269<br />
            Address: Karachi, Pakistan
          </p>
          <p className="text-sm text-gray-300 mt-4">
            &copy; {new Date().getFullYear()} Crafted Whispers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
