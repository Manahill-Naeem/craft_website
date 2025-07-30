// frontend/src/components/Navbar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/cartcontext'; 

// Using Lucide React for icons (install: npm install lucide-react)
import { ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { getCartItemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Custom Orders', href: '/custom-orders' },
    { name: 'Our Story', href: '/our-story' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <nav className="bg-[#7A4E7A] text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gold hover:text-yellow-300 transition-colors rounded-md p-1">
          Crafted Whispers
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-lg font-medium hover:text-gold transition-colors
                ${pathname === link.href ? 'text-gold' : 'text-white'}
                after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-gold after:w-0 after:transition-all after:duration-300 hover:after:w-full
              `}
            >
              {link.name}
            </Link>
          ))}
          {/* Cart Icon for Desktop */}
          <Link href="/cart" className="relative p-2 rounded-full hover:bg-[#4B2B4F] transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Link href="/cart" className="relative p-2 mr-4 rounded-full hover:bg-primary-600 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-[#7A4E7A] bg-opacity-95 flex flex-col items-center justify-center space-y-6 z-40 animate-fade-in-down">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Close mobile menu"
          >
            <X className="w-8 h-8 text-white" />
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-3xl font-bold py-3 hover:text-gold transition-colors
                ${pathname === link.href ? 'text-gold' : 'text-white'}
              `}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
