// frontend/src/app/products/[slug]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { getProductBySlug } from '@/lib/api'; // Assuming this function exists
import { useCart } from '@/context/cartcontext';
import MessageBox from '@/components/MessageBox'; // Import MessageBox for alerts

interface ProductDetailPageProps {
  params: { slug: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [messageBox, setMessageBox] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);


  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProduct = await getProductBySlug(slug);
        setProduct(fetchedProduct);
      } catch (err: any) {
        console.error("Failed to fetch product:", err.message);
        setError("Failed to load product details. Please try again later.");
        setMessageBox({ message: "Failed to load product details. Please try again later.", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setMessageBox({ message: `${quantity} x ${product.name} added to cart!`, type: "success" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl flex flex-col md:flex-row animate-pulse overflow-hidden">
          {/* Image Skeleton */}
          <div className="w-full md:w-1/2 h-80 md:h-auto bg-gray-200 flex-shrink-0 rounded-l-lg"></div>
          {/* Content Skeleton */}
          <div className="p-8 w-full md:w-1/2 flex flex-col justify-between">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-10 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-700 text-xl p-8">
          {error}
          <div className="mt-4">
            <Link href="/shop" className="inline-block bg-[#4B2B4F] text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-[#7A4E7A] transition">
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-700 text-xl p-8">
          Product not found.
          <div className="mt-4">
            <Link href="/shop" className="inline-block bg-[#4B2B4F] text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-[#7A4E7A] transition">
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {messageBox && (
        <MessageBox
          message={messageBox.message}
          type={messageBox.type}
          onClose={() => setMessageBox(null)}
        />
      )}
      <div className="min-h-[calc(100vh-16rem)] py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="w-full md:w-1/2 relative h-80 md:h-auto min-h-[400px]">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                style={{ objectFit: 'contain' }} // Use 'contain' for product images
                className="rounded-l-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={true}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 rounded-l-lg">
                No Image Available
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-2">{product.category?.name || 'Uncategorized'}</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#7A4E7A] mb-4">{product.name}</h1>
              <p className="text-gray-700 text-base leading-relaxed mb-6">{product.description}</p>

              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold #4B2B4F-600">PKR {product.price.toFixed(2)}</span>
                {product.stock <= 0 && (
                  <span className="ml-4 text-red-500 font-semibold text-lg">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto pt-6 border-t border-gray-100">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-md transition"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none focus:ring-0"
                  min="1"
                  max={product.stock > 0 ? product.stock : 1} // Limit quantity to stock
                  readOnly // Prevent direct typing if stock is managed via buttons
                />
                <button
                  onClick={() => setQuantity(prev => Math.min(product.stock > 0 ? product.stock : prev + 1, prev + 1))}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-md transition"
                  disabled={product.stock > 0 && quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 bg-primary-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-[#7A4E7A] transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
