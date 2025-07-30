// frontend/src/app/order-success/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react'; // For success icon

export default function OrderSuccessPage() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, you might get the order ID from a query parameter
    // or a global state after successful checkout. For this example, we'll simulate it.
    const simulatedOrderId = 'CW' + Math.random().toString(36).substring(2, 11).toUpperCase();
    setOrderId(simulatedOrderId);
  }, []);

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 text-center max-w-md w-full">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-[#7A4E7A] mb-4">Order Placed Successfully!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your purchase from Crafted Whispers.
        </p>
        {orderId && (
          <p className="text-md text-gray-600 mb-8">
            Your order number is: <strong className="#4B2B4F-600">{orderId}</strong>
            <br />
            We will contact you shortly to confirm your order and delivery details.
          </p>
        )}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/shop"
            className="inline-block bg-primary-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-[#7A4E7A] transition duration-300 transform hover:scale-105"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-block border border-primary-600 #4B2B4F-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-primary-50 transition duration-300 transform hover:scale-105"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
