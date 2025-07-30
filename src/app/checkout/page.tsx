// frontend/src/app/checkout/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/cartcontext';
import { submitOrder } from '@/lib/api'; // Assuming this function exists
import { useRouter } from 'next/navigation';
import MessageBox from '@/components/MessageBox'; // Import MessageBox for alerts

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [messageBox, setMessageBox] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessageBox(null); // Clear previous messages

    if (cart.length === 0) {
      setMessageBox({ message: 'Your cart is empty. Please add items before checking out.', type: 'warning' });
      setLoading(false);
      return;
    }

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setMessageBox({ message: 'Please fill in all required fields.', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const orderItems = cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      }));

      const orderData = {
        items: orderItems,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        totalAmount: getCartTotal(),
        paymentMethod: 'Cash on Delivery', // Hardcoded for this example
        status: 'Pending', // Initial status
      };

      await submitOrder(orderData); // Call the API to submit the order
      clearCart(); // Clear cart on successful order
      setMessageBox({ message: 'Order placed successfully! We will contact you shortly.', type: 'success' });
      router.push('/order-success'); // Redirect to a success page (you'll need to create this page)
    } catch (err: any) {
      console.error("Order submission failed:", err);
      setMessageBox({ message: `Order failed: ${err.message || 'An unexpected error occurred.'}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !messageBox) { // Only show empty cart message if no other message is active
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-600 text-xl py-10">
          <p className="mb-4">Your cart is empty. Please add items before checking out.</p>
          <Link
            href="/shop"
            className="inline-block bg-[#4B2B4F] text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-[#7A4E7A] transition"
          >
            Go to Shop
          </Link>
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
      <div className="bg-gray-50 py-16 sm:py-24 lg:py-32 min-h-[calc(100vh-16rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-[#7A4E7A] mb-6">Order Summary</h2>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item._id} className="flex py-6">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="80px"
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
                          <h3>{item.name}</h3>
                          <p className="ml-4">PKR {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <p>Order Total</p>
                <p>PKR {getCartTotal().toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-[#7A4E7A] mb-6">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#4B2B4F] focus:border-[#4B2B4F]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#4B2B4F] focus:border-[#4B2B4F]"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#4B2B4F] focus:border-[#4B2B4F]"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                <textarea
                  name="address"
                  id="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#4B2B4F] focus:border-[#4B2B4F]"
                ></textarea>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-[#7A4E7A] mb-4">Payment Method</h3>
                <div className="flex items-center">
                  <input
                    id="cod"
                    name="paymentMethod"
                    type="radio"
                    checked
                    readOnly
                    className="h-4 w-4 #4B2B4F-600 border-gray-300 focus:ring-[#4B2B4F]"
                  />
                  <label htmlFor="cod" className="ml-3 block text-base font-medium text-gray-700">
                    Cash on Delivery (COD)
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full flex items-center justify-center rounded-md border border-transparent bg-[#4B2B4F] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#7A4E7A] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
