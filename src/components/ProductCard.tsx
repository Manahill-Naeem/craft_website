// frontend/src/components/ProductCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/cartcontext';
import { ShoppingCart } from 'lucide-react'; // For cart icon
import MessageBox from './MessageBox'; // Import MessageBox
import { useState } from 'react'; // Import useState for MessageBox

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [messageBox, setMessageBox] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);


  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product details page
    e.stopPropagation(); // Stop event from bubbling up
    addToCart(product, 1);
    setMessageBox({ message: `${product.name} added to cart!`, type: "success" });
  };

  return (
    <>
      {messageBox && (
        <MessageBox
          message={messageBox.message}
          type={messageBox.type}
          onClose={() => setMessageBox(null)}
        />
      )}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-t-lg"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={false} // Only make true for above-the-fold images
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 rounded-t-lg">
                No Image
              </div>
            )}
          </div>
          <div className="p-4 flex-grow flex flex-col">
            <p className="text-sm text-gray-500 mb-1">{product.category?.name || 'Uncategorized'}</p>
            <h3 className="text-xl font-semibold text-[#7A4E7A] mb-2 truncate" title={product.name}>
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
            <div className="mt-auto flex justify-between items-center pt-2">
              <span className="text-2xl font-bold #4B2B4F-600">PKR {product.price.toFixed(2)}</span>
              <button
                onClick={handleAddToCart}
                className="bg-[#4B2B4F] text-white p-3 rounded-full shadow-md hover:bg-primary-600 transition-colors flex items-center justify-center group"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
