// frontend/src/app/cart/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/cartcontext';
import { Trash2, Plus, Minus } from 'lucide-react'; // Icons for cart actions
import MessageBox from '@/components/MessageBox'; // Import MessageBox for alerts

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart } = useCart();
  const [messageBox, setMessageBox] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  const handleRemove = (productId: string, productName: string) => {
    // In a real app, you might use a custom modal for confirmation instead of window.confirm
    if (confirm(`Are you sure you want to remove ${productName} from your cart?`)) {
      removeFromCart(productId);
      setMessageBox({ message: `${productName} removed from cart.`, type: 'info' });
    }
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number, productName: string) => {
    if (newQuantity < 1) {
      handleRemove(productId, productName);
    } else {
      updateCartQuantity(productId, newQuantity);
      setMessageBox({ message: `Quantity for ${productName} updated to ${newQuantity}.`, type: 'success' });
    }
  };

  const handleClearCart = () => {
    // In a real app, you might use a custom modal for confirmation instead of window.confirm
    if (confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
      setMessageBox({ message: 'Your cart has been cleared.', type: 'info' });
    }
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
      <div className="bg-gray-50 py-16 sm:py-24 lg:py-32 min-h-[calc(100vh-16rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#7A4E7A] text-center mb-12">Your Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center text-gray-600 text-xl py-10">
              <p className="mb-4">Your cart is empty. Start adding some beautiful handcrafted items!</p>
              <Link
                href="/shop"
                className="inline-block bg-[#4B2B4F] text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-[#7A4E7A] transition"
              >
                Go to Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items List */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cart.map((item) => (
                      <li key={item._id} className="flex py-6">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              style={{ objectFit: 'cover' }}
                              sizes="96px"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                              No Image
                            </div>
                          )}
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link href={`/products/${item.slug}`}>{item.name}</Link>
                              </h3>
                              <p className="ml-4">PKR {(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.category?.name}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() => handleUpdateQuantity(item._id, item.quantity - 1, item.name)}
                                className="p-1 text-gray-600 hover:bg-gray-100 rounded-l-md transition"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center text-gray-700">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateQuantity(item._id, item.quantity + 1, item.name)}
                                className="p-1 text-gray-600 hover:bg-gray-100 rounded-r-md transition"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                onClick={() => handleRemove(item._id, item.name)}
                                className="font-medium  hover:text-[#4B2B4F] flex items-center gap-1"
                              >
                                <Trash2 className="w-4 h-4" /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 text-right">
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-800 font-semibold px-4 py-2 rounded-md transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6 h-fit sticky top-24">
                <h2 className="text-2xl font-bold text-[#7A4E7A] mb-6">Order Summary</h2>
                <div className="flex justify-between text-lg font-medium text-gray-900 mb-4">
                  <p>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</p>
                  <p>PKR {getCartTotal().toFixed(2)}</p>
                </div>
                <p className="text-sm text-gray-500 mb-6">Shipping calculated at checkout.</p>
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#7A4E7A] transition"
                >
                  Proceed to Checkout
                </Link>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{' '}
                    <Link href="/shop" className="font-medium text-[#4B2B4F] hover:text-[#4B2B4F]">
                      Continue Shopping <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
